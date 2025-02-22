import { SecretsManager } from '@aws-sdk/client-secrets-manager';

/**
 * Resolves environment variables from Secrets Manager
 * @param secretName The name of the secret in AWS Secrets Manager
 * @throws Error if secrets cannot be loaded
 */
export async function resolveEnvironmentVariablesFromSecretsManager(secretName: string): Promise<void> {
  const secretsManager = new SecretsManager({});
  const secret = await secretsManager.getSecretValue({ SecretId: secretName });
  
  if (secret.SecretString) {
    const secrets = JSON.parse(secret.SecretString);
    Object.keys(secrets).forEach(key => {
      process.env[key] = secrets[key];
    });
  } else {
    console.error('Could not load secrets from secrets manager', secretName);
    throw new Error('Could not load secrets from secrets manager');
  }
}
