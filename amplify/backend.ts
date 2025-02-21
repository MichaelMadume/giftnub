import { defineBackend } from '@aws-amplify/backend';
import { stripePayments } from './functions/stripe-payments/resource';

defineBackend({
  stripePayments
});
