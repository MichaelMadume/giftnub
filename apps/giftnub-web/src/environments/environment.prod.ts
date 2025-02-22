export const environment = {
  production: true,
  api: {
    calendly: 'https://ei8yx5nxhc.execute-api.us-east-1.amazonaws.com/prod/calendly',
    consultations: 'https://ei8yx5nxhc.execute-api.us-east-1.amazonaws.com/prod/consultations',
    payments: 'https://ei8yx5nxhc.execute-api.us-east-1.amazonaws.com/prod/payments'
  },
  stripe: {
    publishableKey: 'pk_test_51Qm5i8CzyludbUjXAT8RiieZcwuZOV9AVeICwmBHNsGwjl2vMHJq7lmwpdft5L5hm7LzQ7bGVodvTfxa6G5UO0rq00KdBcSXZk',
    endpoints: {
      webhook: '/stripe-webhook'
    }
  },
  calendly: {
    url: 'https://calendly.com/giftnub', // Replace with your production Calendly URL
    personalEventType: 'personal-consultation',
    corporateEventType: 'corporate-consultation',
    apiKey: 'your_calendly_api_key' // Replace with your production Calendly API key
  }
}; 