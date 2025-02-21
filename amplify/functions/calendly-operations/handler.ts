import type { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";

const CALENDLY_API_URL = "https://api.calendly.com/v2";
const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY || "";

// Initialize axios instance for Calendly
const calendlyApi = axios.create({
  baseURL: CALENDLY_API_URL,
  headers: {
    'Authorization': `Bearer ${CALENDLY_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,DELETE'
};

export const handler: APIGatewayProxyHandler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const { httpMethod, path, body } = event;

    // Handle different endpoints
    if (httpMethod === 'GET') {
      if (path.endsWith('/availability')) {
        return handleGetAvailability(event);
      } else if (path.endsWith('/event-types')) {
        return handleGetEventTypes();
      } else if (path.endsWith('/scheduled-events')) {
        return handleGetScheduledEvents();
      }
    } else if (httpMethod === 'POST' && path.endsWith('/schedule')) {
      return handleScheduleEvent(JSON.parse(body || '{}'));
    } else if (httpMethod === 'DELETE' && path.includes('/scheduled-events/')) {
      const eventUri = path.split('/scheduled-events/')[1];
      return handleCancelEvent(eventUri);
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};

const handleGetAvailability = async (event: any) => {
  const { start_time, end_time } = event.queryStringParameters || {};
  
  if (!start_time || !end_time) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required parameters: start_time and end_time' }),
    };
  }

  try {
    const response = await calendlyApi.get('/user/availability', {
      params: { start_time, end_time }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const handleGetEventTypes = async () => {
  try {
    const response = await calendlyApi.get('/event_types');
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const handleScheduleEvent = async (eventDetails: any) => {
  const { event_type_uri, start_time, end_time, invitee } = eventDetails;

  if (!event_type_uri || !start_time || !end_time || !invitee) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required event details' }),
    };
  }

  try {
    // Verify payment status first
    const stripeResponse = await verifyPaymentStatus(invitee.payment_intent_id);
    if (!stripeResponse.verified) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Payment verification failed' }),
      };
    }

    // Schedule the event with Calendly
    const response = await calendlyApi.post('/scheduled_events', {
      event_type_uri,
      start_time,
      end_time,
      invitee
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const handleGetScheduledEvents = async () => {
  try {
    const response = await calendlyApi.get('/scheduled_events');
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const handleCancelEvent = async (eventUri: string) => {
  if (!eventUri) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing event URI' }),
    };
  }

  try {
    await calendlyApi.delete(`/scheduled_events/${eventUri}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Event cancelled successfully' }),
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const verifyPaymentStatus = async (paymentIntentId: string) => {
  // This should be implemented to verify payment with Stripe
  // You can use the existing stripe-payments Lambda function
  try {
    const response = await axios.get(
      `${process.env.STRIPE_LAMBDA_URL}/payment-status?paymentIntentId=${paymentIntentId}`
    );
    return {
      verified: response.data.status === 'succeeded',
      status: response.data.status
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { verified: false };
  }
}; 