import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Stripe from 'stripe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
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
const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.CONSULTATION_TABLE_NAME!;

async function getStripeInstance(): Promise<Stripe> {
  if (stripe) return stripe;

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    await resolveEnvironmentVariablesFromSecretsManager(process.env.APP_SECRET!);
  }
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  });

  return stripe;
}

async function updateConsultationStatus(consultationId: string, status: string): Promise<void> {
  logger.info('Updating consultation status', { consultationId, status });
  try {
    await dynamoDB.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: consultationId },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ExpressionAttributeValues: {
          ':status': status
        }
      })
    );
    logger.info('Successfully updated consultation status', { consultationId, status });
  } catch (error: any) {
    logger.error('Failed to update consultation status', error, { consultationId, status });
    throw error;
  }
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const requestId = event.requestContext?.requestId || 'unknown';
  logger.info('Processing Stripe webhook event', { 
    requestId,
    path: event.path,
    httpMethod: event.httpMethod
  });

  // Log detailed request information
  logger.info('Request details', {
    requestId,
    headers: event.headers,
    body: event.body,
    queryStringParameters: event.queryStringParameters,
    pathParameters: event.pathParameters,
    requestContext: event.requestContext
  });

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    if (!event.body) {
      logger.error('Missing request body', null, { requestId });
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    const stripe = await getStripeInstance();
    
    // Handle webhook events
    const sig = event.headers['stripe-signature'] || 
                event.headers['Stripe-Signature'] ||
                Object.entries(event.headers)
                  .find(([key]) => key.toLowerCase() === 'stripe-signature')?.[1];

    if (!sig) {
      logger.error('Missing Stripe signature', null, { requestId });
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing Stripe signature header' }),
      };
    }
    
    let stripeEvent;
    
    try {
      const payload = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
      stripeEvent = stripe.webhooks.constructEvent(
        payload,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      logger.info('Successfully constructed Stripe event', { 
        requestId,
        eventType: stripeEvent.type,
        eventId: stripeEvent.id
      });
    } catch (err: any) {
      logger.error('Failed to construct Stripe event', err, { requestId });
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
      };
    }

    // Handle specific event types
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        const consultationId = paymentIntent.metadata.consultationId;
        
        logger.info('Processing successful payment', {
          requestId,
          paymentIntentId: paymentIntent.id,
          consultationId,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        });
        
        if (consultationId) {
          await updateConsultationStatus(consultationId, 'confirmed');
        }
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const failedPayment = stripeEvent.data.object as Stripe.PaymentIntent;
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
          eventType: stripeEvent.type,
          eventId: stripeEvent.id
        });
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ received: true }),
    };

  } catch (error: any) {
    logger.error('Unexpected error processing webhook', error, { requestId });
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
}; 