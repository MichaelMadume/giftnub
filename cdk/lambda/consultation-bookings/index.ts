import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
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

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.CONSULTATION_TABLE_NAME!;
let stripe: Stripe | null = null;

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

function getConsultationAmount(type: string): number {
  switch (type) {
    case 'corporate':
      return 15000; // $150.00 CAD
    case 'event':
      return 10000; // $100.00 CAD
    case 'personal':
    default:
      return 5000; // $50.00 CAD
  }
}

interface ConsultationBooking {
  id: string;
  type: 'personal' | 'corporate' | 'event';
  email: string;
  name: string;
  notes?: string;
  startTime: string;
  status: 'pending' | 'payment_processing' | 'confirmed' | 'failed';
  paymentIntentId?: string;
  createdAt: string;
  ttl: number;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const requestId = event.requestContext?.requestId || 'unknown';
  logger.info('Processing consultation booking request', {
    requestId,
    path: event.path,
    httpMethod: event.httpMethod
  });

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Handle GET request for consultation status
    if (event.httpMethod === 'GET') {
      const bookingId = event.pathParameters?.id;
      
      if (!bookingId) {
        logger.error('Missing booking ID', null, { requestId });
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Booking ID is required' })
        };
      }

      logger.info('Fetching consultation booking', { requestId, bookingId });
      const result = await dynamoDB.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id: bookingId }
        })
      );

      if (!result.Item) {
        logger.error('Booking not found', null, { requestId, bookingId });
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Booking not found' })
        };
      }

      logger.info('Successfully retrieved booking', { requestId, bookingId });
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(result.Item)
      };
    }

    // Handle POST request for new consultation booking with payment intent
    if (event.httpMethod === 'POST') {
      if (!event.body) {
        logger.error('Missing request body', null, { requestId });
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Request body is required' })
        };
      }

      const booking = JSON.parse(event.body);
      
      // Validate required fields
      if (!booking.type || !booking.email || !booking.name || !booking.startTime) {
        logger.error('Missing required fields', null, { 
          requestId,
          providedFields: Object.keys(booking)
        });
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Missing required fields' })
        };
      }

      const bookingId = uuidv4();
      logger.info('Creating new consultation booking', {
        requestId,
        bookingId,
        type: booking.type,
        email: booking.email,
        startTime: booking.startTime
      });

      const now = new Date();
      const ttl = Math.floor(now.getTime() / 1000) + (30 * 24 * 60 * 60); // 30 days TTL

      // Create Stripe Payment Intent
      const stripe = await getStripeInstance();
      const amount = getConsultationAmount(booking.type);
      
      logger.info('Creating Stripe payment intent', {
        requestId,
        bookingId,
        amount,
        currency: 'cad'
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'cad',
        metadata: {
          consultationId: bookingId,
          consultationType: booking.type,
          customerEmail: booking.email,
          customerName: booking.name
        }
      });

      const newBooking: ConsultationBooking = {
        id: bookingId,
        type: booking.type,
        email: booking.email,
        name: booking.name,
        notes: booking.notes,
        startTime: booking.startTime,
        status: 'payment_processing',
        paymentIntentId: paymentIntent.id,
        createdAt: now.toISOString(),
        ttl
      };

      logger.info('Saving consultation booking', {
        requestId,
        bookingId,
        paymentIntentId: paymentIntent.id
      });

      await dynamoDB.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newBooking
        })
      );

      logger.info('Successfully created consultation booking', {
        requestId,
        bookingId,
        paymentIntentId: paymentIntent.id
      });

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({
          booking: newBooking,
          paymentIntent: {
            clientSecret: paymentIntent.client_secret,
            id: paymentIntent.id
          }
        })
      };
    }

    logger.error('Method not allowed', null, { 
      requestId,
      method: event.httpMethod 
    });
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error: any) {
    logger.error('Unexpected error processing consultation booking', error, { requestId });
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
}; 