import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import * as crypto from 'crypto';
import {
  Gift,
  GiftSuggestionResponseSchema,
  GiftSuggestionResponse,
  GIFT_DATA,
} from '@giftnub/gift-data';
import { z } from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { resolveEnvironmentVariablesFromSecretsManager } from '../../shared/utils/environment';

// Logger utility for consistent log format
const logger = {
  info: (message: string, context: Record<string, any> = {}) => {
    console.log(
      JSON.stringify({
        level: 'INFO',
        message,
        timestamp: new Date().toISOString(),
        ...context,
      })
    );
  },
  error: (message: string, error: any, context: Record<string, any> = {}) => {
    console.error(
      JSON.stringify({
        level: 'ERROR',
        message,
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack,
        ...context,
      })
    );
  },
};

// Configuration
let llm: ChatDeepSeek | null = null;
let chain: RunnableSequence | null = null;

async function getLLMInstance(): Promise<ChatDeepSeek> {
  if (llm) return llm;

  if (!process.env.DEEPSEEK_API_KEY) {
    await resolveEnvironmentVariablesFromSecretsManager(
      process.env.APP_SECRET!
    );
  }

  // Log API key information safely
  const apiKey = process.env.DEEPSEEK_API_KEY!;
  logger.info('DeepSeek API key details', {
    exists: !!apiKey,
    length: apiKey?.length || 0,
    firstThreeChars: apiKey?.substring(0, 3) || '',
    lastThreeChars: apiKey ? apiKey.substring(apiKey.length - 3) : ''
  });

  // Inspect the ChatDeepSeek class
  logger.info('ChatDeepSeek package details', {
    version: require('@langchain/deepseek/package.json').version || 'unknown',
    dependencies: Object.keys(require('@langchain/deepseek/package.json').dependencies || {})
  });

  logger.info('Creating ChatDeepSeek instance', {
    model: 'deepseek-chat',
    temperature: 0.7
  });
  
  try {
    // Log the DeepSeek configuration
    const deepseekConfig = {
      model: 'deepseek-chat',
      apiKey: `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`,
      temperature: 0.7,
    };
    logger.info('DeepSeek configuration', { config: deepseekConfig });
    
    // Create the LLM instance
    llm = new ChatDeepSeek({
      model: 'deepseek-chat',
      apiKey: process.env.DEEPSEEK_API_KEY!,
      temperature: 0.7,
    });
    
    // Check if baseURL is being used or can be set
    const baseURL = (llm as any).client?.baseURL || 
                   (llm as any).client?.configuration?.baseURL || 
                   'not-found';
    logger.info('DeepSeek client configuration', {
      hasClient: !!(llm as any).client,
      baseURL: baseURL,
      timeoutMs: (llm as any).client?.timeoutMs || 'not-found'
    });

    // Log llm object structure (without exposing sensitive data)
    logger.info('LLM instance created', {
      type: llm.constructor.name,
      properties: Object.keys(llm),
      methods: Object.getOwnPropertyNames(Object.getPrototypeOf(llm)),
      config: {
        model: (llm as any)._llmType || 'unknown',
        temperature: (llm as any).temperature || 'unknown'
      }
    });
    
    return llm;
  } catch (llmError) {
    logger.error('Error creating DeepSeek instance', llmError as Error);
    throw llmError;
  }
}

// Create the structured output parser
const outputParser = StructuredOutputParser.fromZodSchema(
  GiftSuggestionResponseSchema
);

// Get the format instructions for the model
const formatInstructions = outputParser.getFormatInstructions();

// Create a formatted string of the gift catalog for the prompt
const giftCatalogReference = GIFT_DATA.map(
  (gift) =>
    `ID: ${gift.id}\nTitle: ${gift.title}\nDescription: ${
      gift.description
    }\nCategories: ${gift.category.join(', ')}`
).join('\n\n');

// System prompt template
const systemTemplate = `You are GiftNub's AI gift recommendation expert. Your job is to provide thoughtful, creative, and personalized gift suggestions based on the information provided.

{format_instructions}

Your response should include:
1. A marketing theme (4 words recommended) that captures the essence of the gift recommendations
2. A warm marketing message summary telling the user what GiftNub can do for them
3. Exactly 3 high-quality gift suggestions with appropriate titles and marketing descriptions

For each gift suggestion:
- Provide a catchy marketing title
- Write an enticing marketing description that tells the user what could be offered
- Include a 'giftId' field that references one of our existing gifts from the catalog (use ids like '1', '2', etc.)

IMPORTANT: Only include fields defined in the schema. Do NOT include prices, confidence scores, categories, or other fields not specified in the schema.

Make the suggestions specific, descriptive, and tailored to the recipient type, occasion, budget range, and any specific details provided.`;

// Human message template
const humanTemplate = `Please suggest gifts based on the following information:
Recipient Type: {recipient_type}
Occasion: {occasion}
Budget Range: {budget}
Additional Context: {gift_prompt}

Here is our existing gift catalog for reference. Please use this to understand our gift style and offerings:

GIFT CATALOG REFERENCE:
{gift_catalog}

Your suggestions should be inspired by our gift style but tailored specifically to the user's request.`;

// Create the prompt template
const chatPrompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(systemTemplate),
  HumanMessagePromptTemplate.fromTemplate(humanTemplate),
]);

async function getChain(): Promise<RunnableSequence> {
  if (chain) return chain;

  logger.info('Creating RunnableSequence chain');
  const llm = await getLLMInstance();
  
  logger.info('Setting up chain with structured output', {
    outputSchema: JSON.stringify(GiftSuggestionResponseSchema)
  });
  
  chain = RunnableSequence.from([
    chatPrompt,
    llm.withStructuredOutput(GiftSuggestionResponseSchema),
  ]);
  
  logger.info('Chain created successfully', {
    chainType: chain.constructor.name
  });
  
  return chain;
}

// Helper to generate a unique ID
const generateId = () => crypto.randomUUID();

// Helper to get a random gift ID from our catalog
const getRandomGiftId = () => {
  const randomIndex = Math.floor(Math.random() * GIFT_DATA.length);
  return GIFT_DATA[randomIndex].id;
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestId = event.requestContext?.requestId || 'unknown';
  logger.info('Processing gift suggestions request', {
    requestId,
    path: event.path,
    httpMethod: event.httpMethod,
    hasBody: !!event.body
  });

  try {
    // Parse the request body
    const body = event.body ? JSON.parse(event.body) : {};
    logger.info('Request body parsed', {
      requestId,
      bodyKeys: Object.keys(body)
    });
    
    const { giftPrompt, recipientType, occasion, budget } = body;

    // Validate input
    if (!giftPrompt || !recipientType || !occasion || !budget) {
      logger.error('Missing required parameters', null, { requestId, body });
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message:
            'Missing required parameters: giftPrompt, recipientType, occasion, or budget',
        }),
      };
    }

    // Get chain instance
    logger.info('Getting chain instance', { requestId });
    const chain = await getChain();

    // Log input to the chain
    logger.info('Preparing to invoke chain', {
      requestId,
      inputParams: {
        recipient_type: recipientType,
        occasion,
        budget,
        gift_prompt_length: giftPrompt?.length,
        format_instructions_length: formatInstructions?.length,
        gift_catalog_length: giftCatalogReference?.length
      }
    });

    // Run the chain with user inputs
    logger.info('Invoking LLM chain', { requestId });
    try {
      const result = await chain.invoke({
        recipient_type: recipientType,
        occasion,
        budget,
        gift_prompt: giftPrompt,
        format_instructions: formatInstructions,
        gift_catalog: giftCatalogReference,
      });

      logger.info('Chain invocation successful', {
        requestId,
        resultKeys: Object.keys(result),
        suggestionCount: result.suggestions?.length
      });

      // Ensure each suggestion has a unique ID and giftId if not provided
      const formattedResult = {
        ...result,
        suggestions: result.suggestions.map(
          (suggestion: { id?: string; giftId?: string }) => ({
            ...suggestion,
            id: suggestion.id || generateId(),
          })
        ),
      };

      // Return successful response
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(formattedResult),
      };
    } catch (invokeError) {
      logger.error('Error during chain invocation', invokeError as Error, {
        requestId,
        errorDetails: {
          name: (invokeError as Error).name,
          message: (invokeError as Error).message,
          stack: (invokeError as Error).stack,
          constructor: (invokeError as Error).constructor?.name
        }
      });
      
      // Check for specific authentication errors
      const errorMsg = (invokeError as Error).message || '';
      if (errorMsg.includes('Authentication') || errorMsg.includes('401')) {
        logger.error('Authentication error with LLM provider', null, {
          requestId,
          errorMsg
        });
      }
      
      throw invokeError; // Re-throw to be caught by the outer catch block
    }
  } catch (error: unknown) {
    logger.error('Error processing request', error as Error, { requestId });

    // Create a fallback response with error information
    const fallbackResponse: GiftSuggestionResponse = {
      marketingTheme: 'Premium Gifting Solutions',
      marketingMessageSummary:
        "We're experiencing a technical issue. Our gift experts are still available to help you find the perfect gift through our consultation service.",
      suggestions: [
        {
          id: generateId(),
          title: 'Curated Luxury Gift Experience',
          description:
            "A thoughtfully curated collection of premium items tailored to your recipient's interests, including artisanal treats, personalized keepsakes, and exclusive experiences.",
          giftId: '1',
        },
        {
          id: generateId(),
          title: 'Bespoke Event Gift Package',
          description:
            'A specially designed gift package perfect for your event, featuring customized items that reflect your theme and create lasting memories for your guests.',
          giftId: '2',
        },
        {
          id: generateId(),
          title: 'Personalized Celebration Box',
          description:
            'A beautifully crafted celebration box filled with hand-picked items that tell a story and create a memorable unboxing experience.',
          giftId: '3',
        },
      ],
    };

    // Return error response with fallback data
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        ...fallbackResponse,
        errorMessage:
          process.env.NODE_ENV === 'development'
            ? (error as Error).toString()
            : 'An error occurred while processing your request',
      }),
    };
  }
};
