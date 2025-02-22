export const environment = {
  production: false,
  api: {
    calendly: 'http://localhost:20002/calendly-operations',
    stripe: 'https://6iqe0rkuh0.execute-api.us-east-1.amazonaws.com/test-invoke-stage'
  },
  stripe: {
    publishableKey: 'pk_test_51Qm5i8CzyludbUjXAT8RiieZcwuZOV9AVeICwmBHNsGwjl2vMHJq7lmwpdft5L5hm7LzQ7bGVodvTfxa6G5UO0rq00KdBcSXZk',
    endpoints: {
      createPaymentIntent: '/payments/create-payment-intent',
      webhook: '/webhook'
    }
  }
}; 