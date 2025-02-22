import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios, { AxiosInstance } from 'axios';
import { resolveEnvironmentVariablesFromSecretsManager } from '@shared/utils/environment';

let calendlyApi: AxiosInstance | null = null;

async function getCalendlyApi(): Promise<AxiosInstance> {
  if (calendlyApi) return calendlyApi;

  // Load secrets if not already loaded
  if (!process.env.CALENDLY_API_KEY) {
    await resolveEnvironmentVariablesFromSecretsManager(process.env.APP_SECRET!);
  }

  calendlyApi = axios.create({
    baseURL: 'https://api.calendly.com/v2',
    headers: {
      'Authorization': `Bearer ${process.env.CALENDLY_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return calendlyApi;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,GET'
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const api = await getCalendlyApi();

    if (event.httpMethod === 'GET' && event.path.endsWith('/availability')) {
      const { start_time, end_time } = event.queryStringParameters || {};
      
      if (!start_time || !end_time) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Missing required parameters: start_time and end_time' }),
        };
      }

      try {
        // Get user's availability
        const response = await api.get('/user_availability', {
          params: {
            user: process.env.CALENDLY_USER_URI,
            start_time,
            end_time
          }
        });

        // Get scheduled events for the time period
        const scheduledEvents = await api.get('/scheduled_events', {
          params: {
            user: process.env.CALENDLY_USER_URI,
            min_start_time: start_time,
            max_start_time: end_time,
            status: 'active'
          }
        });

        // Process the availability data
        const availability = response.data.availability_intervals || [];
        const bookedSlots = scheduledEvents.data.collection.map((event: any) => ({
          startTime: event.start_time,
          endTime: event.end_time
        }));

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            availability,
            bookedSlots
          }),
        };
      } catch (error: any) {
        console.error('Calendly API Error:', error.response?.data || error.message);
        return {
          statusCode: error.response?.status || 500,
          headers: corsHeaders,
          body: JSON.stringify({ error: error.message }),
        };
      }
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