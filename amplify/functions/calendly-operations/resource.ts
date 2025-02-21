import { defineFunction } from "@aws-amplify/backend";

export const calendlyOperations = defineFunction({
  entry: "./handler.ts",
  environment: {
    CALENDLY_API_KEY: process.env.CALENDLY_API_KEY!,
    STRIPE_LAMBDA_URL: process.env.STRIPE_LAMBDA_URL!
  }
}); 