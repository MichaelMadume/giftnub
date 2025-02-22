import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios, { AxiosInstance } from 'axios';
import { resolveEnvironmentVariablesFromSecretsManager } from '@shared/utils/environment';
import { addMinutes } from 'date-fns';

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

let calendlyApi: AxiosInstance | null = null;

interface EventType {
  uri: string;
  slug: string;
  name: string;
  scheduling_url: string;
}

async function getCalendlyApi(): Promise<AxiosInstance> {
  if (calendlyApi) return calendlyApi;

  logger.info('Initializing Calendly API client');
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,GET'
};

async function getEventTypes(api: AxiosInstance) {
  logger.info('Fetching Calendly event types');
  const userResponse = await api.get('/users/me');
  const userUri = userResponse.data.resource.uri;

  const eventTypesResponse = await api.get('/event_types', {
    params: {
      user: userUri
    }
  });

  logger.info('Successfully fetched event types', {
    count: eventTypesResponse.data.collection.length
  });
  return eventTypesResponse.data.collection;
}

async function findEventTypeBySlug(api: AxiosInstance, slug: string): Promise<EventType | null> {
  logger.info('Finding event type by slug', { slug });
  const eventTypes = await getEventTypes(api);
  const eventType = eventTypes.find((eventType: EventType) => eventType.slug === slug) || null;
  
  if (eventType) {
    logger.info('Found matching event type', { 
      slug,
      name: eventType.name,
      uri: eventType.uri 
    });
  } else {
    logger.error('Event type not found', null, { slug });
  }
  
  return eventType;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const requestId = event.requestContext?.requestId || 'unknown';
  logger.info('Processing Calendly operation request', {
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
    const api = await getCalendlyApi();

    if (event.httpMethod === 'GET' && event.path.endsWith('/event-types')) {
      try {
        logger.info('Fetching event type details', { 
          requestId,
          slug: process.env.CALENDLY_EVENT_SLUG 
        });
        
        const eventType = await findEventTypeBySlug(api, process.env.CALENDLY_EVENT_SLUG!);
        
        if (!eventType) {
          logger.error('Event type not found', null, { 
            requestId,
            slug: process.env.CALENDLY_EVENT_SLUG 
          });
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: `Event type with slug '${process.env.CALENDLY_EVENT_SLUG}' not found` }),
          };
        }

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ eventType }),
        };
      } catch (error: any) {
        logger.error('Calendly API Error fetching event types', error, {
          requestId,
          response: error.response?.data,
          status: error.response?.status
        });

        return {
          statusCode: error.response?.status || 500,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: error.message,
            details: error.response?.data
          }),
        };
      }
    }

    if (event.httpMethod === 'GET' && event.path.endsWith('/availability')) {
      try {
        logger.info('Fetching availability', { 
          requestId,
          slug: process.env.CALENDLY_EVENT_SLUG 
        });
        
        const eventType = await findEventTypeBySlug(api, process.env.CALENDLY_EVENT_SLUG!);
        
        if (!eventType) {
          logger.error('Event type not found for availability check', null, { 
            requestId,
            slug: process.env.CALENDLY_EVENT_SLUG 
          });
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: `Event type with slug '${process.env.CALENDLY_EVENT_SLUG}' not found` }),
          };
        }

        const startTime = addMinutes(new Date(), 15);
        const endTime = addMinutes(startTime, 7 * 24 * 60); // 7 days in minutes

        logger.info('Fetching available time slots', {
          requestId,
          eventTypeUri: eventType.uri,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        });

        const availableTimesResponse = await api.get('/event_type_available_times', {
          params: {
            event_type: eventType.uri,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString()
          }
        });

        const availableSlots = availableTimesResponse.data.collection.map((slot: any) => ({
          start_time: slot.start_time,
        }));

        logger.info('Successfully fetched available slots', {
          requestId,
          slotsCount: availableSlots.length
        });

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ availableSlots }),
        };
      } catch (error: any) {
        logger.error('Calendly API Error fetching availability', error, {
          requestId,
          response: error.response?.data,
          status: error.response?.status
        });

        return {
          statusCode: error.response?.status || 500,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: error.message,
            details: error.response?.data
          }),
        };
      }
    }

    logger.error('Invalid endpoint', null, { 
      requestId,
      path: event.path,
      method: event.httpMethod 
    });
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not Found' }),
    };
  } catch (error: any) {
    logger.error('Unexpected error in Calendly operations', error, { requestId });
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
}; 