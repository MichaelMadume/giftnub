import { handler } from '../lambda/gift-suggestions/index';
import { config } from 'dotenv';
import { APIGatewayProxyEvent, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';

config({ path: '.env' });

const event: Partial<APIGatewayProxyEvent> = {
  httpMethod: 'POST',
  path: '/gifts/suggestions',
  body: JSON.stringify({
    giftPrompt: "Looking for a birthday gift for a tech-savvy 30-year-old who loves gaming",
    recipientType: "individual",
    occasion: "birthday",
    budget: "50-200"
  }),
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
    path: '/gifts/suggestions',
    stage: 'test',
    requestTimeEpoch: Date.now(),
    resourceId: 'test-resource',
    resourcePath: '/gifts/suggestions'
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