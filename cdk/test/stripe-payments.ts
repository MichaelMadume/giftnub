import { handler } from '../lambda/stripe-payments';

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
      path: '/webhook',
      body: JSON.stringify({
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test123',
            amount: 1000
          }
        }
      }),
      headers: {
        'stripe-signature': 'dummy_signature'
      }
    };

    const result = await handler(event as any);
    expect(result.statusCode).toBeDefined();
  });
}); 