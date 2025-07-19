/**
 * 配置处理器
 * 用于处理API Key轮询配置并初始化轮询系统
 */

import { apiKeyRotationTransformer, ApiKeyRotationConfig } from './apiKeyRotationTransformer';
import { log } from './log';

export interface ProviderConfig {
  name: string;
  api_base_url: string;
  api_key?: string; // 向后兼容，单个API Key
  api_keys?: string[] | Array<{
    key: string;
    weight?: number;
    maxFailures?: number;
    cooldownTime?: number;
  }>; // 新的多API Key配置
  models: string[];
  transformer?: any;
  // API Key轮询配置
  enable_rotation?: boolean;
  rotation_strategy?: 'round_robin' | 'random' | 'weighted' | 'least_used';
  retry_on_failure?: boolean;
  max_retries?: number;
}

export interface ProcessedConfig {
  providers: ProviderConfig[];
  router: any;
  global: any;
}

/**
 * 处理配置文件，初始化API Key轮询系统
 */
export function processConfig(config: any): ProcessedConfig {
  const processedConfig: ProcessedConfig = {
    providers: [],
    router: config.Router || {},
    global: {
      APIKEY: config.APIKEY,
      PROXY_URL: config.PROXY_URL,
      LOG: config.LOG,
      HOST: config.HOST
    }
  };

  // 处理providers配置
  const providers = config.Providers || config.providers || [];
  
  for (const provider of providers) {
    const processedProvider = processProviderConfig(provider);
    processedConfig.providers.push(processedProvider);
    
    // 初始化API Key轮询
    initializeApiKeyRotation(processedProvider);
  }

  return processedConfig;
}

/**
 * 处理单个provider配置
 */
function processProviderConfig(provider: any): ProviderConfig {
  const processedProvider: ProviderConfig = {
    name: provider.name,
    api_base_url: provider.api_base_url,
    models: provider.models || [],
    transformer: provider.transformer
  };

  // 处理API Key配置
  if (provider.api_keys) {
    // 新的多API Key配置
    processedProvider.api_keys = provider.api_keys;
    processedProvider.enable_rotation = provider.enable_rotation !== false; // 默认启用
    processedProvider.rotation_strategy = provider.rotation_strategy || 'round_robin';
    processedProvider.retry_on_failure = provider.retry_on_failure !== false; // 默认启用
    processedProvider.max_retries = provider.max_retries || 3;
  } else if (provider.api_key) {
    // 向后兼容，单个API Key
    processedProvider.api_key = provider.api_key;
    processedProvider.enable_rotation = false;
  } else {
    throw new Error(`Provider ${provider.name} must have either 'api_key' or 'api_keys' configured`);
  }

  return processedProvider;
}

/**
 * 初始化API Key轮询系统
 */
function initializeApiKeyRotation(provider: ProviderConfig): void {
  if (!provider.enable_rotation || !provider.api_keys) {
    return;
  }

  const rotationConfig: ApiKeyRotationConfig = {
    api_keys: provider.api_keys,
    strategy: provider.rotation_strategy,
    enable_rotation: provider.enable_rotation,
    retry_on_failure: provider.retry_on_failure,
    max_retries: provider.max_retries
  };

  apiKeyRotationTransformer.registerProvider(provider.name, rotationConfig);
  
  log(`Initialized API key rotation for provider: ${provider.name}`);
}

/**
 * 验证配置格式
 */
export function validateConfig(config: any): string[] {
  const errors: string[] = [];

  if (!config.Providers && !config.providers) {
    errors.push('Missing Providers configuration');
    return errors;
  }

  const providers = config.Providers || config.providers || [];
  
  for (const provider of providers) {
    // 检查必需字段
    if (!provider.name) {
      errors.push('Provider missing required field: name');
    }
    
    if (!provider.api_base_url) {
      errors.push(`Provider ${provider.name || 'unknown'} missing required field: api_base_url`);
    }
    
    if (!provider.models || !Array.isArray(provider.models) || provider.models.length === 0) {
      errors.push(`Provider ${provider.name || 'unknown'} missing required field: models`);
    }

    // 检查API Key配置
    if (!provider.api_key && !provider.api_keys) {
      errors.push(`Provider ${provider.name || 'unknown'} must have either 'api_key' or 'api_keys' configured`);
    }

    // 检查API Key轮询配置
    if (provider.api_keys && provider.enable_rotation) {
      if (!Array.isArray(provider.api_keys) || provider.api_keys.length === 0) {
        errors.push(`Provider ${provider.name || 'unknown'} api_keys must be a non-empty array`);
      }

      if (provider.rotation_strategy && !['round_robin', 'random', 'weighted', 'least_used'].includes(provider.rotation_strategy)) {
        errors.push(`Provider ${provider.name || 'unknown'} invalid rotation_strategy: ${provider.rotation_strategy}`);
      }

      if (provider.max_retries && (typeof provider.max_retries !== 'number' || provider.max_retries < 1)) {
        errors.push(`Provider ${provider.name || 'unknown'} max_retries must be a positive number`);
      }
    }
  }

  return errors;
}

/**
 * 获取API Key（支持轮询）
 */
export function getApiKey(providerName: string, provider: ProviderConfig): string {
  if (provider.enable_rotation && provider.api_keys) {
    const rotatedKey = apiKeyRotationTransformer.getApiKey(providerName);
    if (rotatedKey) {
      return rotatedKey;
    }
    // 如果没有可用的轮询密钥，回退到第一个密钥
    const firstKey = Array.isArray(provider.api_keys) && provider.api_keys.length > 0 
      ? (typeof provider.api_keys[0] === 'string' ? provider.api_keys[0] : provider.api_keys[0].key)
      : null;
    if (firstKey) {
      return firstKey;
    }
  }

  // 回退到单个API Key
  if (provider.api_key) {
    return provider.api_key;
  }

  throw new Error(`No API key available for provider: ${providerName}`);
}

/**
 * 标记API Key失败
 */
export function markApiKeyFailure(providerName: string, apiKey: string, error?: any): void {
  apiKeyRotationTransformer.markFailure(providerName, apiKey, error);
}

/**
 * 标记API Key成功
 */
export function markApiKeySuccess(providerName: string, apiKey: string): void {
  apiKeyRotationTransformer.markSuccess(providerName, apiKey);
}

/**
 * 获取所有提供商的状态信息
 */
export function getApiKeyRotationStatus(): any[] {
  return apiKeyRotationTransformer.getAllProviderStatus();
}

/**
 * 重置指定提供商的所有API Key状态
 */
export function resetProviderApiKeys(providerName: string): void {
  apiKeyRotationTransformer.resetProvider(providerName);
} 