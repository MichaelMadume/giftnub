import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function for Stripe payments
    const stripePaymentsLambda = new nodejs.NodejsFunction(this, 'StripePaymentsLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../lambda/stripe-payments/index.ts'),
      environment: {
        APP_SECRET: 'app/secrets', // The name of the secret in Secrets Manager
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        sourceMap: true,
        minify: true,
        externalModules: ['aws-sdk'],
      },
    });

    // Create the Lambda function for Calendly operations
    const calendlyOperationsLambda = new nodejs.NodejsFunction(this, 'CalendlyOperationsLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../lambda/calendly-operations/src/index.ts'),
      environment: {
        APP_SECRET: 'app/secrets', // The name of the secret in Secrets Manager
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        sourceMap: true,
        minify: true,
        externalModules: ['aws-sdk'],
      },
    });

    // Grant the Lambda functions permission to read secrets
    const secretsPolicy = new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [`arn:aws:secretsmanager:${this.region}:${this.account}:secret:app/secrets-*`],
    });

    stripePaymentsLambda.addToRolePolicy(secretsPolicy);
    calendlyOperationsLambda.addToRolePolicy(secretsPolicy);

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'GiftNubApi', {
      restApiName: 'GiftNub API',
      description: 'API Gateway for GiftNub services',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'stripe-signature'],
      },
    });

    // Create API resources and methods for Stripe payments
    const payments = api.root.addResource('payments');
    const createPaymentIntent = payments.addResource('create-payment-intent');
    createPaymentIntent.addMethod('POST', new apigateway.LambdaIntegration(stripePaymentsLambda));

    const webhook = api.root.addResource('webhook');
    webhook.addMethod('POST', new apigateway.LambdaIntegration(stripePaymentsLambda));
    webhook.addMethod('GET', new apigateway.LambdaIntegration(stripePaymentsLambda));

    // Create API resources and methods for Calendly operations
    const calendly = api.root.addResource('calendly');
    const availability = calendly.addResource('availability');
    availability.addMethod('GET', new apigateway.LambdaIntegration(calendlyOperationsLambda));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });
  }
}
