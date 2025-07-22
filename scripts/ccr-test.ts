#!/usr/bin/env ts-node
// @ts-ignore
import { readFileSync, existsSync } from 'fs';
// @ts-ignore
import { join } from 'path';
// @ts-ignore
import { homedir } from 'os';

// 声明全局变量
declare var process: any;

interface Config {
  PROXY_URL?: string;
  Providers?: Array<{
    name: string;
    api_base_url: string;
    api_keys: string[];
    models: string[];
  }>;
}

interface TestResult {
  provider: string;
  model: string;
  apiKey: string;
  success: boolean;
  error?: string;
}

/**
 * 测试单个 Provider + Model + API Key 组合
 */
async function testProviderModelKey(
  provider: any,
  model: string,
  apiKey: string
): Promise<TestResult> {
  const result: TestResult = {
    provider: provider.name,
    model: model,
    apiKey: `${apiKey.substring(0, 8)}...`,
    success: false
  };

  try {
    const url = `${provider.api_base_url}${model}:generateContent`;

    const fetchOptions: any = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'Hello' }]
          }
        ]
      })
    };

    const res = await fetch(url, fetchOptions);

    if (res.ok) {
      result.success = true;
    } else {
      const errorText = await res.text();
      result.error = `HTTP ${res.status}: ${errorText.slice(0, 100)}...`;
    }
  } catch (error: any) {
    result.error = error.message || 'Unknown error';
  }

  return result;
}

/**
 * 主测试函数
 */
async function main() {
  const configPath = join(homedir(), '.claude-code-router', 'config.json');
  
  if (!existsSync(configPath)) {
    console.error('❌ Config file not found:', configPath);
    process.exit(1);
  }

  let config: Config;
  try {
    const configContent = readFileSync(configPath, 'utf-8');
    config = JSON.parse(configContent);
  } catch (error) {
    console.error('❌ Failed to load config:', error);
    process.exit(1);
  }

  // 设置代理 - 现在 config 已经被正确赋值
  if (config && config.PROXY_URL && !process.env.PROXY_URL) {
    process.env.PROXY_URL = config.PROXY_URL;
  }

  if (process.env.PROXY_URL) {
    if (process.env.PROXY_URL.startsWith('socks')) {
      console.error('❌ socks5 proxy not supported in test script!');
      console.error('   Please use HTTP proxy instead');
      process.exit(1);
    } else {
      // 使用 undici ProxyAgent 设置HTTP代理
      let setGlobalDispatcher: any = null;
      let ProxyAgent: any = null;

      async function initializeProxySupport() {
        try {
          const undici = await import('undici');
          setGlobalDispatcher = undici.setGlobalDispatcher;
          ProxyAgent = undici.ProxyAgent;
          return true;
        } catch (error) {
          return false;
        }
      }

      const proxyInitialized = await initializeProxySupport();
      if (proxyInitialized && setGlobalDispatcher && ProxyAgent) {
        try {
          const proxyAgent = new ProxyAgent(process.env.PROXY_URL);
          setGlobalDispatcher(proxyAgent);
        } catch (proxyError: any) {
          console.error('❌ Failed to setup proxy:', proxyError.message);
          process.exit(1);
        }
      }
    }
  }

  const providers = config && config.Providers ? config.Providers : [];
  if (providers.length === 0) {
    console.error('❌ No providers configured');
    process.exit(1);
  }

  console.log('🧪 Testing API keys...\n');

  const results: TestResult[] = [];
  let totalTests = 0;

  // 计算总测试数
  for (const provider of providers) {
    for (const model of provider.models) {
      for (const apiKey of provider.api_keys) {
        totalTests++;
      }
    }
  }

  // 执行测试
  for (const provider of providers) {
    for (const model of provider.models) {
      for (const apiKey of provider.api_keys) {
        const result = await testProviderModelKey(provider, model, apiKey);
        results.push(result);
        
        // 只显示失败的测试
        if (!result.success) {
          console.log(`❌ ${result.provider}/${result.model} (${result.apiKey}): ${result.error}`);
        }
      }
    }
  }

  // 统计结果
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;

  console.log('\n📊 Test Results:');
  console.log(`   ✅ Successful: ${successCount}/${totalTests}`);
  console.log(`   ❌ Failed: ${failureCount}/${totalTests}`);

  if (failureCount > 0) {
    console.log('\n💡 Tips:');
    console.log('   • Check your API keys are valid');
    console.log('   • Verify network connectivity');
    console.log('   • Ensure proxy settings are correct');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed! Your API keys are working correctly.');
  }
}

main().catch(console.error); 