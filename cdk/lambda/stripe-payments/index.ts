import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Stripe from 'stripe';
import { resolveEnvironmentVariablesFromSecretsManager } from '../../shared/utils/environment';

let stripe: Stripe | null = null;

async function getStripeInstance(): Promise<Stripe> {
  if (stripe) return stripe;

  // Load secrets if not already loaded
  if (!process.env.STRIPE_SECRET_KEY) {
    await resolveEnvironmentVariablesFromSecretsManager(process.env.APP_SECRET!);
  }
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  });

  return stripe;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    const stripe = await getStripeInstance();
    const requestBody = JSON.parse(event.body);
    
    switch (event.httpMethod) {
      case 'POST':
        // Create payment intent
        if (event.path === '/payments/create-payment-intent') {
          const { amount, currency = 'usd' } = requestBody;
          
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
          });

          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
          };
        }

        // Handle webhook events
        if (event.path === '/webhook') {
          const sig = event.headers['stripe-signature'];
          
          let stripeEvent;
          
          try {
            stripeEvent = stripe.webhooks.constructEvent(
              event.body,
              sig!,
              process.env.STRIPE_WEBHOOK_SECRET!
            );
          } catch (err: any) {
            return {
              statusCode: 400,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
            };
          }

          // Handle specific event types
          switch (stripeEvent.type) {
            case 'payment_intent.succeeded':
              const paymentIntent = stripeEvent.data.object;
              console.log('Payment succeeded:', paymentIntent.id);
              break;
            
            case 'payment_intent.payment_failed':
              const failedPayment = stripeEvent.data.object;
              console.log('Payment failed:', failedPayment.id);
              break;
          }

          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ received: true }),
          };
        }
        break;

      case 'GET':
        // Handle webhook verification
        if (event.path === '/webhook') {
          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ received: true }),
          };
        }
        break;
    }

    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Not Found' }),
    };

  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
}; 