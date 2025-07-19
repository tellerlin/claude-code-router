/**
 * API Key 轮询管理器
 * 支持多种轮询策略：轮询、随机、加权轮询
 */

export interface ApiKeyConfig {
  key: string;
  weight?: number; // 权重，用于加权轮询
  maxFailures?: number; // 最大失败次数
  cooldownTime?: number; // 冷却时间（毫秒）
}

export interface ApiKeyStatus {
  key: string;
  failures: number;
  lastFailureTime: number;
  isActive: boolean;
  lastUsedTime: number;
}

export type RotationStrategy = 'round_robin' | 'random' | 'weighted' | 'least_used';

export class ApiKeyRotator {
  private apiKeys: ApiKeyConfig[];
  private status: Map<string, ApiKeyStatus>;
  private currentIndex: number = 0;
  private strategy: RotationStrategy;

  constructor(apiKeys: string[] | ApiKeyConfig[], strategy: RotationStrategy = 'round_robin') {
    this.apiKeys = this.normalizeApiKeys(apiKeys);
    this.strategy = strategy;
    this.status = new Map();
    
    // 初始化状态
    this.apiKeys.forEach(config => {
      this.status.set(config.key, {
        key: config.key,
        failures: 0,
        lastFailureTime: 0,
        isActive: true,
        lastUsedTime: 0
      });
    });
  }

  private normalizeApiKeys(apiKeys: string[] | ApiKeyConfig[]): ApiKeyConfig[] {
    return apiKeys.map(key => {
      if (typeof key === 'string') {
        return { key };
      }
      return key;
    });
  }

  /**
   * 获取下一个可用的API Key
   */
  getNextKey(): string | null {
    const availableKeys = this.getAvailableKeys();
    
    if (availableKeys.length === 0) {
      return null;
    }

    let selectedKey: string;

    switch (this.strategy) {
      case 'round_robin':
        selectedKey = this.roundRobinSelect(availableKeys);
        break;
      case 'random':
        selectedKey = this.randomSelect(availableKeys);
        break;
      case 'weighted':
        selectedKey = this.weightedSelect(availableKeys);
        break;
      case 'least_used':
        selectedKey = this.leastUsedSelect(availableKeys);
        break;
      default:
        selectedKey = this.roundRobinSelect(availableKeys);
    }

    // 更新使用时间
    const status = this.status.get(selectedKey);
    if (status) {
      status.lastUsedTime = Date.now();
    }

    return selectedKey;
  }

  /**
   * 获取所有可用的API Key
   */
  private getAvailableKeys(): string[] {
    const now = Date.now();
    return this.apiKeys
      .filter(config => {
        const status = this.status.get(config.key);
        if (!status || !status.isActive) return false;
        
        // 检查冷却时间
        if (config.cooldownTime && status.lastFailureTime > 0) {
          const timeSinceFailure = now - status.lastFailureTime;
          if (timeSinceFailure < config.cooldownTime) return false;
        }
        
        // 检查最大失败次数
        if (config.maxFailures && status.failures >= config.maxFailures) return false;
        
        return true;
      })
      .map(config => config.key);
  }

  /**
   * 轮询选择
   */
  private roundRobinSelect(availableKeys: string[]): string {
    if (availableKeys.length === 0) throw new Error('No available keys');
    
    const key = availableKeys[this.currentIndex % availableKeys.length];
    this.currentIndex = (this.currentIndex + 1) % availableKeys.length;
    return key;
  }

  /**
   * 随机选择
   */
  private randomSelect(availableKeys: string[]): string {
    if (availableKeys.length === 0) throw new Error('No available keys');
    
    const index = Math.floor(Math.random() * availableKeys.length);
    return availableKeys[index];
  }

  /**
   * 加权选择
   */
  private weightedSelect(availableKeys: string[]): string {
    if (availableKeys.length === 0) throw new Error('No available keys');
    
    const availableConfigs = this.apiKeys.filter(config => 
      availableKeys.includes(config.key)
    );
    
    const totalWeight = availableConfigs.reduce((sum, config) => 
      sum + (config.weight || 1), 0
    );
    
    let random = Math.random() * totalWeight;
    
    for (const config of availableConfigs) {
      const weight = config.weight || 1;
      if (random <= weight) {
        return config.key;
      }
      random -= weight;
    }
    
    // 兜底返回第一个
    return availableKeys[0];
  }

  /**
   * 最少使用选择
   */
  private leastUsedSelect(availableKeys: string[]): string {
    if (availableKeys.length === 0) throw new Error('No available keys');
    
    let leastUsedKey = availableKeys[0];
    let leastUsedTime = this.status.get(leastUsedKey)?.lastUsedTime || 0;
    
    for (const key of availableKeys) {
      const status = this.status.get(key);
      const lastUsedTime = status?.lastUsedTime || 0;
      
      if (lastUsedTime < leastUsedTime) {
        leastUsedKey = key;
        leastUsedTime = lastUsedTime;
      }
    }
    
    return leastUsedKey;
  }

  /**
   * 标记API Key失败
   */
  markFailure(key: string, error?: any): void {
    const status = this.status.get(key);
    if (!status) return;
    
    status.failures++;
    status.lastFailureTime = Date.now();
    
    // 检查是否超过最大失败次数
    const config = this.apiKeys.find(c => c.key === key);
    if (config?.maxFailures && status.failures >= config.maxFailures) {
      status.isActive = false;
    }
  }

  /**
   * 标记API Key成功
   */
  markSuccess(key: string): void {
    const status = this.status.get(key);
    if (!status) return;
    
    // 重置失败计数
    status.failures = 0;
    status.lastFailureTime = 0;
    status.isActive = true;
  }

  /**
   * 重置API Key状态
   */
  resetKey(key: string): void {
    const status = this.status.get(key);
    if (status) {
      status.failures = 0;
      status.lastFailureTime = 0;
      status.isActive = true;
    }
  }

  /**
   * 获取API Key状态
   */
  getKeyStatus(key: string): ApiKeyStatus | undefined {
    return this.status.get(key);
  }

  /**
   * 获取所有API Key状态
   */
  getAllStatus(): ApiKeyStatus[] {
    return Array.from(this.status.values());
  }

  /**
   * 获取可用API Key数量
   */
  getAvailableCount(): number {
    return this.getAvailableKeys().length;
  }

  /**
   * 获取总API Key数量
   */
  getTotalCount(): number {
    return this.apiKeys.length;
  }

  /**
   * 更新轮询策略
   */
  setStrategy(strategy: RotationStrategy): void {
    this.strategy = strategy;
  }

  /**
   * 添加新的API Key
   */
  addApiKey(key: string | ApiKeyConfig): void {
    const config = typeof key === 'string' ? { key } : key;
    this.apiKeys.push(config);
    
    this.status.set(config.key, {
      key: config.key,
      failures: 0,
      lastFailureTime: 0,
      isActive: true,
      lastUsedTime: 0
    });
  }

  /**
   * 移除API Key
   */
  removeApiKey(key: string): boolean {
    const index = this.apiKeys.findIndex(config => config.key === key);
    if (index === -1) return false;
    
    this.apiKeys.splice(index, 1);
    this.status.delete(key);
    return true;
  }
}

/**
 * 创建API Key轮询器
 */
export function createApiKeyRotator(
  apiKeys: string[] | ApiKeyConfig[], 
  strategy: RotationStrategy = 'round_robin'
): ApiKeyRotator {
  return new ApiKeyRotator(apiKeys, strategy);
} 