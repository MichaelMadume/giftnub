import type { APIGatewayProxyHandler } from "aws-lambda";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-01-27.acacia",
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
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

  const { httpMethod, path } = event;

  // Handle different endpoints
  if (httpMethod === 'POST') {
    if (path.endsWith('/create-payment')) {
      return handleCreatePayment(event);
    } else if (path.endsWith('/webhook')) {
      return handleWebhook(event);
    }
  } else if (httpMethod === 'GET' && path.endsWith('/payment-status')) {
    return handlePaymentStatus(event);
  }

  return {
    statusCode: 404,
    headers: corsHeaders,
    body: JSON.stringify({ error: 'Not Found' }),
  };
};

const handleCreatePayment = async (event: any) => {
  let body: { amount: number; currency: string; customerId?: string; metadata?: any };
  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Invalid JSON in request body" }),
    };
  }

  const { amount, currency, customerId, metadata = {} } = body;
  if (!amount || !currency) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Missing required parameters: amount and currency" }),
    };
  }

  try {
    // Create or retrieve customer
    let customer = customerId;
    if (!customer) {
      const newCustomer = await stripe.customers.create({
        metadata: metadata.customer || {},
      });
      customer = newCustomer.id;
    }

    // Create a payment intent with customer data
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer,
      metadata: {
        ...metadata,
        productType: metadata.productType || 'consultation',
        createdAt: new Date().toISOString(),
      },
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId: customer,
      }),
    };
  } catch (error: any) {
    console.error("Stripe error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const handleWebhook = async (event: any) => {
  const sig = event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret!
    );

    // Handle successful payments
    if (stripeEvent.type === 'payment_intent.succeeded') {
      const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
      // Here you would typically:
      // 1. Update your database with payment status
      // 2. Trigger any post-payment workflows
      // 3. Send confirmation emails, etc.
      console.log('Payment succeeded:', paymentIntent.id);
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ received: true }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

const handlePaymentStatus = async (event: any) => {
  const paymentIntentId = event.queryStringParameters?.paymentIntentId;
  
  if (!paymentIntentId) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing paymentIntentId parameter' }),
    };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        status: paymentIntent.status,
        metadata: paymentIntent.metadata,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message }),
    };
  }
};