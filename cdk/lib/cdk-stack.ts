import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table for consultation bookings
    const consultationTable = new dynamodb.Table(this, 'ConsultationBookings', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // Add GSI for status queries
    consultationTable.addGlobalSecondaryIndex({
      indexName: 'status-index',
      partitionKey: { name: 'status', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdAt', type: dynamodb.AttributeType.STRING },
    });

    // Create the Lambda function for Stripe payments
    const stripePaymentsLambda = new nodejs.NodejsFunction(
      this,
      'StripePaymentsLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, '../lambda/stripe-payments/index.ts'),
        environment: {
          APP_SECRET: 'app/secrets',
          NODE_OPTIONS: '--enable-source-maps',
          CONSULTATION_TABLE_NAME: consultationTable.tableName,
        },
        bundling: {
          sourceMap: true,
          minify: true,
          externalModules: ['aws-sdk'],
        },
        timeout: cdk.Duration.seconds(30),
        memorySize: 256,
      }
    );

    // Create EventBridge rule for Stripe events
    const stripeEventBus = events.EventBus.fromEventBusArn(
      this,
      'StripeEventBus',
      'arn:aws:events:us-east-1:339713151306:event-bus/aws.partner/stripe.com/ed_test_61S4kV4VO3GwMlnCi16S4kRXNcA83YV8u4QmWfM7s99s'
    );

    // Create rule for payment_intent.succeeded events
    new events.Rule(this, 'StripePaymentSucceededRule', {
      eventBus: stripeEventBus,
      eventPattern: {
        source: ['aws.partner/stripe.com/ed_test_61S4kV4VO3GwMlnCi16S4kRXNcA83YV8u4QmWfM7s99s'],
        detailType: ['payment_intent.succeeded'],
        detail: {
          type: ['payment_intent.succeeded']
        }
      },
      targets: [new targets.LambdaFunction(stripePaymentsLambda)]
    });

    // Create rule for payment_intent.payment_failed events
    new events.Rule(this, 'StripePaymentFailedRule', {
      eventBus: stripeEventBus,
      eventPattern: {
        source: ['aws.partner/stripe.com/ed_test_61S4kV4VO3GwMlnCi16S4kRXNcA83YV8u4QmWfM7s99s'],
        detailType: ['payment_intent.payment_failed'],
        detail: {
          type: ['payment_intent.payment_failed']
        }
      },
      targets: [new targets.LambdaFunction(stripePaymentsLambda)]
    });

    // Create the Lambda function for Calendly operations
    const calendlyOperationsLambda = new nodejs.NodejsFunction(
      this,
      'CalendlyOperationsLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(
          __dirname,
          '../lambda/calendly-operations/src/index.ts'
        ),
        environment: {
          APP_SECRET: 'app/secrets',
          NODE_OPTIONS: '--enable-source-maps',
          CONSULTATION_TABLE_NAME: consultationTable.tableName,
        },
        bundling: {
          sourceMap: true,
          minify: true,
          externalModules: ['aws-sdk'],
        },
        timeout: cdk.Duration.seconds(30),
        memorySize: 256,
      }
    );

    // Create the Lambda function for consultation bookings
    const consultationBookingsLambda = new nodejs.NodejsFunction(
      this,
      'ConsultationBookingsLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, '../lambda/consultation-bookings/index.ts'),
        environment: {
          APP_SECRET: 'app/secrets',
          NODE_OPTIONS: '--enable-source-maps',
          CONSULTATION_TABLE_NAME: consultationTable.tableName,
        },
        bundling: {
          sourceMap: true,
          minify: true,
          externalModules: ['aws-sdk'],
        },
        timeout: cdk.Duration.seconds(30),
        memorySize: 256,
      }
    );

    // Create the Lambda function for gift suggestions using LangChain and DeepSeek
    const giftSuggestionsLambda = new nodejs.NodejsFunction(
      this,
      'GiftSuggestionsLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, '../lambda/gift-suggestions/index.ts'),
        environment: {
          APP_SECRET: 'app/secrets',
          NODE_OPTIONS: '--enable-source-maps',
        },
        bundling: {
          sourceMap: true,
          minify: true,
          externalModules: ['aws-sdk'],
        },
        timeout: cdk.Duration.seconds(60), // Longer timeout for AI processing
        memorySize: 512, // More memory for LLM operations
      }
    );

    // Grant DynamoDB permissions
    consultationTable.grantReadWriteData(stripePaymentsLambda);
    consultationTable.grantReadWriteData(calendlyOperationsLambda);
    consultationTable.grantReadWriteData(consultationBookingsLambda);

    // Grant the Lambda functions permission to read secrets
    const secretsPolicy = new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [
        `arn:aws:secretsmanager:${this.region}:${this.account}:secret:app/secrets-*`,
      ],
    });

    stripePaymentsLambda.addToRolePolicy(secretsPolicy);
    calendlyOperationsLambda.addToRolePolicy(secretsPolicy);
    consultationBookingsLambda.addToRolePolicy(secretsPolicy);
    giftSuggestionsLambda.addToRolePolicy(secretsPolicy);

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'GiftNubApi', {
      restApiName: 'GiftNub API',
      description: 'API Gateway for GiftNub services',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
      },
    });

    // Create API resources and methods for Calendly operations
    const calendly = api.root.addResource('calendly');
    const availability = calendly.addResource('availability');
    availability.addMethod(
      'GET',
      new apigateway.LambdaIntegration(calendlyOperationsLambda)
    );

    // Create API resources and methods for consultation bookings
    const consultations = api.root.addResource('consultations');
    consultations.addMethod(
      'POST',
      new apigateway.LambdaIntegration(consultationBookingsLambda)
    );

    const consultationStatus = consultations.addResource('{id}');
    consultationStatus.addMethod(
      'GET',
      new apigateway.LambdaIntegration(consultationBookingsLambda)
    );

    // Create API resources and methods for gift suggestions
    const gifts = api.root.addResource('gifts');
    const suggestions = gifts.addResource('suggestions');
    suggestions.addMethod(
      'POST',
      new apigateway.LambdaIntegration(giftSuggestionsLambda)
    );

    // Output the API URL and DynamoDB table name
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });

    new cdk.CfnOutput(this, 'ConsultationTableName', {
      value: consultationTable.tableName,
      description: 'DynamoDB Consultation Bookings Table Name',
    });
  }
}
