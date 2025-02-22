import { handler } from '../lambda/calendly-operations/src/index.js';
import { config } from 'dotenv';
import { APIGatewayProxyEvent } from 'aws-lambda';

config({ path: '.env' });

const event: Partial<APIGatewayProxyEvent> = {
  httpMethod: 'GET',
  path: '/calendly/availability',
  queryStringParameters: {
    start_time: '2025-02-22T00:00:00Z',
    end_time: '2025-02-27T00:00:00Z',
  },
};

async function runTest() {
  try {
    const result = await handler(event as any);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

runTest();
