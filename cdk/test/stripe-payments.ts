import { handler } from '../lambda/stripe-payments/index';
import { config } from 'dotenv';
import { APIGatewayProxyEvent, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';

config({ path: '.env' });

describe('Stripe Payments Lambda', () => {
  test('create payment intent', async () => {
    const event = {
      httpMethod: 'POST',
      path: '/payments/create-payment-intent',
      body: JSON.stringify({
        amount: 1000,
        currency: 'usd'
      })
    };

    const result = await handler(event as any);
    expect(result.statusCode).toBeDefined();
  });

  test('webhook handler', async () => {
    const event = {
      httpMethod: 'POST',
      path: '/stripe/webhook',
      headers: {
        'stripe-signature': 'YOUR_STRIPE_SIGNATURE_HERE'
      },
      body: 'YOUR_WEBHOOK_PAYLOAD_HERE',
      isBase64Encoded: false,
      requestContext: {
        requestId: 'test-request-id'
      }
    };

    const result = await handler(event as any);
    expect(result.statusCode).toBeDefined();
  });
});

const event: Partial<APIGatewayProxyEvent> = {
  httpMethod: 'POST',
  path: '/stripe/webhook',
  headers: {
    'stripe-signature': 'YOUR_STRIPE_SIGNATURE_HERE'
  },
  body: 'YOUR_WEBHOOK_PAYLOAD_HERE',
  isBase64Encoded: false,
  requestContext: {
    accountId: 'test-account',
    apiId: 'test-api',
    requestId: 'test-request-id',
    protocol: 'HTTP/1.1',
    httpMethod: 'POST',
    authorizer: {} as APIGatewayEventDefaultAuthorizerContext,
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '127.0.0.1',
      user: null,
      userAgent: 'test-agent',
      userArn: null
    },
    path: '/stripe/webhook',
    stage: 'test',
    requestTimeEpoch: Date.now(),
    resourceId: 'test-resource',
    resourcePath: '/stripe/webhook'
  }
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