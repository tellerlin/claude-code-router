/**
 * API Key 轮询转换器
 * 用于在请求处理过程中自动轮询API Key
 */

import { ApiKeyRotator, createApiKeyRotator, RotationStrategy } from './apiKeyRotation';
import { log } from './log';

export interface ApiKeyRotationConfig {
  api_keys: string[] | Array<{
    key: string;
    weight?: number;
    maxFailures?: number;
    cooldownTime?: number;
  }>;
  strategy?: RotationStrategy;
  enable_rotation?: boolean;
  retry_on_failure?: boolean;
  max_retries?: number;
}

export class ApiKeyRotationTransformer {
  private rotators: Map<string, ApiKeyRotator> = new Map();
  private config: Map<string, ApiKeyRotationConfig> = new Map();

  constructor() {}

  /**
   * 注册提供商的API Key轮询配置
   */
  registerProvider(providerName: string, config: ApiKeyRotationConfig): void {
    if (!config.enable_rotation || !config.api_keys || config.api_keys.length === 0) {
      return;
    }

    this.config.set(providerName, config);
    
    const rotator = createApiKeyRotator(
      config.api_keys,
      config.strategy || 'round_robin'
    );
    
    this.rotators.set(providerName, rotator);
    
    log(`Registered API key rotation for provider: ${providerName}, keys: ${config.api_keys.length}, strategy: ${config.strategy || 'round_robin'}`);
  }

  /**
   * 获取提供商的API Key
   */
  getApiKey(providerName: string): string | null {
    const rotator = this.rotators.get(providerName);
    if (!rotator) {
      return null;
    }

    const key = rotator.getNextKey();
    if (key) {
      log(`Using API key for provider ${providerName}: ${key.substring(0, 8)}...`);
    } else {
      log(`No available API keys for provider: ${providerName}`);
    }
    
    return key;
  }

  /**
   * 标记API Key失败
   */
  markFailure(providerName: string, apiKey: string, error?: any): void {
    const rotator = this.rotators.get(providerName);
    if (!rotator) return;

    rotator.markFailure(apiKey, error);
    log(`Marked API key failure for provider ${providerName}: ${apiKey.substring(0, 8)}..., error: ${error?.message || 'Unknown error'}`);
    
    // 检查是否还有可用密钥
    const availableCount = rotator.getAvailableCount();
    if (availableCount === 0) {
      log(`Warning: No available API keys for provider: ${providerName}`);
    }
  }

  /**
   * 标记API Key成功
   */
  markSuccess(providerName: string, apiKey: string): void {
    const rotator = this.rotators.get(providerName);
    if (!rotator) return;

    rotator.markSuccess(apiKey);
    log(`Marked API key success for provider ${providerName}: ${apiKey.substring(0, 8)}...`);
  }

  /**
   * 处理请求，自动轮询API Key
   */
  async processRequest(
    providerName: string, 
    request: any, 
    requestFn: (apiKey: string) => Promise<any>
  ): Promise<any> {
    const config = this.config.get(providerName);
    if (!config || !config.enable_rotation) {
      // 如果没有配置轮询，使用默认的api_key
      return requestFn(request.api_key);
    }

    const maxRetries = config.max_retries || 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const apiKey = this.getApiKey(providerName);
      if (!apiKey) {
        throw new Error(`No available API keys for provider: ${providerName}`);
      }

      try {
        // 更新请求中的API Key
        const requestWithKey = {
          ...request,
          api_key: apiKey
        };

        const response = await requestFn(requestWithKey);
        
        // 标记成功
        this.markSuccess(providerName, apiKey);
        
        return response;
      } catch (error: any) {
        lastError = error;
        
        // 标记失败
        this.markFailure(providerName, apiKey, error);
        
        // 检查是否应该重试
        if (!config.retry_on_failure || attempt === maxRetries - 1) {
          break;
        }
        
        // 等待一段时间后重试
        await this.delay(1000 * (attempt + 1));
      }
    }

    throw lastError || new Error(`Failed to process request for provider: ${providerName}`);
  }

  /**
   * 获取提供商的状态信息
   */
  getProviderStatus(providerName: string): any {
    const rotator = this.rotators.get(providerName);
    const config = this.config.get(providerName);
    
    if (!rotator || !config) {
      return null;
    }

    return {
      provider: providerName,
      enabled: config.enable_rotation,
      strategy: config.strategy || 'round_robin',
      totalKeys: rotator.getTotalCount(),
      availableKeys: rotator.getAvailableCount(),
      keyStatus: rotator.getAllStatus()
    };
  }

  /**
   * 获取所有提供商的状态信息
   */
  getAllProviderStatus(): any[] {
    const status: any[] = [];
    
    for (const [providerName] of this.rotators) {
      const providerStatus = this.getProviderStatus(providerName);
      if (providerStatus) {
        status.push(providerStatus);
      }
    }
    
    return status;
  }

  /**
   * 重置提供商的所有API Key状态
   */
  resetProvider(providerName: string): void {
    const rotator = this.rotators.get(providerName);
    if (!rotator) return;

    const allStatus = rotator.getAllStatus();
    allStatus.forEach(status => {
      rotator.resetKey(status.key);
    });
    
    log(`Reset all API key status for provider: ${providerName}`);
  }

  /**
   * 移除提供商
   */
  removeProvider(providerName: string): boolean {
    const removed = this.rotators.delete(providerName);
    this.config.delete(providerName);
    
    if (removed) {
      log(`Removed API key rotation for provider: ${providerName}`);
    }
    
    return removed;
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 全局实例
export const apiKeyRotationTransformer = new ApiKeyRotationTransformer();

/**
 * 转换器函数，用于在请求处理过程中自动轮询API Key
 */
export function createApiKeyRotationTransformer() {
  return {
    name: 'api_key_rotation',
    
    transformRequestIn(request: any, providerName: string): any {
      // 这里不需要修改请求，实际的API Key轮询在processRequest中处理
      return request;
    },
    
    transformResponseOut(response: any, providerName: string, apiKey: string): any {
      // 标记API Key成功
      apiKeyRotationTransformer.markSuccess(providerName, apiKey);
      return response;
    },
    
    async processRequest(
      providerName: string, 
      request: any, 
      requestFn: (apiKey: string) => Promise<any>
    ): Promise<any> {
      return apiKeyRotationTransformer.processRequest(providerName, request, requestFn);
    }
  };
} 