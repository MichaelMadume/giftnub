import { EventBridgeEvent } from 'aws-lambda';
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

  if (!process.env.STRIPE_SECRET_KEY) {
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

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: Stripe.PaymentIntent;
  };
}

export const handler = async (event: EventBridgeEvent<string, StripeEvent>): Promise<void> => {
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
          await updateConsultationStatus(consultationId, 'confirmed');
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