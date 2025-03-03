import { EventBridgeEvent, APIGatewayProxyResult } from 'aws-lambda';
import Stripe from 'stripe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import axios from 'axios';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { resolveEnvironmentVariablesFromSecretsManager } from '../../shared/utils/environment';

// Logger utility for consistent log format
const logger = {
  info: (message: string, context: Record<string, any> = {}) => {
    console.log(JSON.stringify({ level: 'INFO', message, timestamp: new Date().toISOString(), ...context }));
  },
  error: (message: string, error: any, context: Record<string, any> = {}) => {
    console.error(JSON.stringify({
      level: 'ERROR',
      message,
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      ...context
    }));
  }
};

let stripe: Stripe | null = null;
let calendlyApi: any = null;
const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.CONSULTATION_TABLE_NAME!;
const sesClient = new SESClient({});

async function getStripeInstance(): Promise<Stripe> {
  if (stripe) return stripe;

  if (!process.env.STRIPE_SECRET_KEY) {
    await resolveEnvironmentVariablesFromSecretsManager(process.env.APP_SECRET!);
  }
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });

  return stripe;
}

async function getCalendlyApi() {
  if (calendlyApi) return calendlyApi;

  if (!process.env.CALENDLY_API_KEY || !process.env.CALENDLY_EVENT_SLUG) {
    await resolveEnvironmentVariablesFromSecretsManager(process.env.APP_SECRET!);
  }

  calendlyApi = axios.create({
    baseURL: 'https://api.calendly.com',
    headers: {
      'Authorization': `Bearer ${process.env.CALENDLY_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return calendlyApi;
}

async function getConsultationBooking(consultationId: string) {
  logger.info('Fetching consultation booking', { consultationId });
  try {
    const result = await dynamoDB.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: consultationId }
      })
    );
    return result.Item;
  } catch (error: any) {
    logger.error('Failed to fetch consultation booking', error, { consultationId });
    throw error;
  }
}

async function sendSchedulingEmail(booking: any, schedulingLink: string, eventType: any) {
  const logContext = {
    consultationId: booking.id,
    email: booking.email,
    name: booking.name
  };

  logger.info('Sending scheduling email to user', logContext);
  
  try {
    const emailParams = {
      Destination: {
        ToAddresses: [booking.email]
      },
      Message: {
        Body: {
          Html: {
            Data: `
              <h2>Schedule Your Consultation</h2>
              <p>Hi ${booking.name},</p>
              <p>Thank you for your payment. Please click the link below to schedule your consultation:</p>
              <p><a href="${schedulingLink}">Schedule Now</a></p>
              <p>This is a unique scheduling link created just for you.</p>
            `
          }
        },
        Subject: {
          Data: 'Schedule Your Consultation - Payment Received'
        }
      },
      Source: process.env.EMAIL_FROM_ADDRESS!
    };

    await sesClient.send(new SendEmailCommand(emailParams));
    logger.info('Successfully sent scheduling email', logContext);
  } catch (error: any) {
    logger.error('Failed to send scheduling email', error, logContext);
    // Don't throw here - we don't want to fail the whole process if email fails
  }
}

async function scheduleCalendlyMeeting(booking: any) {
  const logContext = { 
    consultationId: booking.id,
    email: booking.email,
    name: booking.name,
    startTime: booking.startTime 
  };
  
  logger.info('Starting Calendly scheduling process', logContext);
  
  try {
    const api = await getCalendlyApi();
    
    logger.info('Fetching Calendly user info', logContext);
    const userResponse = await api.get('/users/me');
    const userUri = userResponse.data.resource.uri;
    
    logger.info('Fetching event types', { ...logContext, userUri });
    const eventTypesResponse = await api.get('/event_types', {
      params: { user: userUri }
    });
    
    const eventType = eventTypesResponse.data.collection.find(
      (et: any) => et.slug === process.env.CALENDLY_EVENT_SLUG
    );

    if (!eventType) {
      const error = new Error(`Event type with slug '${process.env.CALENDLY_EVENT_SLUG}' not found`);
      logger.error('Event type not found', error, { 
        ...logContext, 
        slug: process.env.CALENDLY_EVENT_SLUG,
        availableTypes: eventTypesResponse.data.collection.map((et: any) => et.slug)
      });
      throw error;
    }

    logger.info('Generating scheduling link', { ...logContext, eventTypeUri: eventType.uri });
    
    const schedulingLink = `${eventType.scheduling_url}?name=${encodeURIComponent(booking.name)}&email=${encodeURIComponent(booking.email)}`;
    
    await sendSchedulingEmail(booking, schedulingLink, eventType);

    return {
      eventTypeUri: eventType.uri,
      schedulingLink,
      eventTypeName: eventType.name
    };
  } catch (error: any) {
    logger.error('Failed to generate Calendly scheduling link', error, logContext);
    throw error;
  }
}

async function updateConsultationStatus(consultationId: string, status: string, calendlyData?: any): Promise<void> {
  logger.info('Updating consultation status', { consultationId, status });
  try {
    const updateExpression = calendlyData 
      ? 'SET #status = :status, calendlyData = :calendlyData'
      : 'SET #status = :status';
    
    const expressionValues: any = {
      ':status': status
    };
    
    if (calendlyData) {
      expressionValues[':calendlyData'] = calendlyData;
    }

    await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: consultationId },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ExpressionAttributeValues: expressionValues
      })
    );
    logger.info('Successfully updated consultation status', { consultationId, status });
  } catch (error: any) {
    logger.error('Failed to update consultation status', error, { consultationId, status });
    throw error;
  }
}

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: Stripe.PaymentIntent;
  };
}

export const handler = async (event: EventBridgeEvent<string, StripeEvent>): Promise<APIGatewayProxyResult | void> => {
  const requestId = event.id;
  logger.info('Processing Stripe event from EventBridge', { 
    requestId,
    eventType: event.detail.type,
    eventId: event.detail.id
  });

  try {
    await getStripeInstance();
    
    // Handle specific event types
    switch (event.detail.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.detail.data.object;
        const consultationId = paymentIntent.metadata.consultationId;
        
        logger.info('Processing successful payment', {
          requestId,
          paymentIntentId: paymentIntent.id,
          consultationId,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        });
        
        if (consultationId) {
          // Get the consultation booking
          const booking = await getConsultationBooking(consultationId);
          
          if (!booking) {
            throw new Error(`Consultation booking ${consultationId} not found`);
          }

          // Schedule the Calendly meeting
          const calendlyData = await scheduleCalendlyMeeting(booking);
          
          // Update the consultation status with Calendly event URI
          await updateConsultationStatus(consultationId, 'confirmed', calendlyData);

          return {
            statusCode: 200,
            body: JSON.stringify({
              status: 'success',
              message: 'Payment processed and scheduling link generated',
              data: {
                consultationId,
                schedulingLink: calendlyData.schedulingLink,
                eventTypeName: calendlyData.eventTypeName
              }
            })
          };
        }
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const failedPayment = event.detail.data.object;
        const failedConsultationId = failedPayment.metadata.consultationId;
        
        logger.info('Processing failed payment', {
          requestId,
          paymentIntentId: failedPayment.id,
          consultationId: failedConsultationId,
          lastPaymentError: failedPayment.last_payment_error?.message
        });
        
        if (failedConsultationId) {
          await updateConsultationStatus(failedConsultationId, 'failed');
        }
        break;
      }
      
      default:
        logger.info('Unhandled event type received', {
          requestId,
          eventType: event.detail.type,
          eventId: event.detail.id
        });
    }
  } catch (error: any) {
    logger.error('Unexpected error processing event', error, { requestId });
    throw error; // Re-throw the error to mark the Lambda execution as failed
  }
}; 