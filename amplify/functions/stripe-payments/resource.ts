import { defineFunction } from "@aws-amplify/backend";

export const stripePayments = defineFunction({
  name: "stripe-payments",
  entry: "./handler.ts",
  // Optionally add environment settings; ensure STRIPE_SECRET_KEY is set as a secret in your Amplify project.
  environment: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  }
}); 