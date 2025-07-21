#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const CONFIG_PATH = path.join(require('os').homedir(), '.claude-code-router', 'config.json');

interface Provider {
  name: string;
  api_base_url: string;
  api_key?: string;
  api_keys?: (string | { key: string })[];
  models: string[];
}

function loadConfig(): any {
  console.log(`[DEBUG] Loading config from: ${CONFIG_PATH}`);
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Config file not found: ${CONFIG_PATH}`);
    process.exit(1);
  }
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  console.log(`[DEBUG] Config file size: ${configContent.length} bytes`);
  const config = JSON.parse(configContent);
  console.log(`[DEBUG] Config loaded successfully. PROXY_URL in config: ${config.PROXY_URL || 'NOT_SET'}`);
  return config;
}

function getApiKeys(provider: Provider): string[] {
  if (provider.api_keys) {
    return provider.api_keys.map(k => typeof k === 'string' ? k : k.key);
  }
  if (provider.api_key) {
    return [provider.api_key];
  }
  return [];
}

function getTestEndpoint(provider: Provider, model: string): { url: string; method: string; body?: any; headers: Record<string, string> } {
  // 针对主流API风格自动适配
  if (provider.api_base_url.includes('openai') || provider.api_base_url.includes('deepseek') || provider.api_base_url.includes('openrouter')) {
    // OpenAI/DeepSeek/OpenRouter风格
    return {
      url: provider.api_base_url.replace(/\/$/, '') + '/chat/completions',
      method: 'POST',
      body: JSON.stringify({ model, messages: [{ role: 'user', content: 'ping' }] }),
      headers: { 'Content-Type': 'application/json' }
    };
  } else if (provider.api_base_url.includes('generativelanguage.googleapis.com')) {
    // Gemini风格
    return {
      url: provider.api_base_url.replace(/\/$/, '') + `/${model}:generateContent`,
      method: 'POST',
      body: JSON.stringify({ contents: [{ parts: [{ text: 'ping' }] }] }),
      headers: { 'Content-Type': 'application/json' }
    };
  } else {
    // 默认尝试 /v1/models
    return {
      url: provider.api_base_url.replace(/\/$/, '') + '/v1/models',
      method: 'GET',
      headers: { }
    };
  }
}

async function testProviderModelKey(provider: Provider, model: string, apiKey: string) {
  const { url, method, body, headers } = getTestEndpoint(provider, model);
  // 自动适配主流API的鉴权方式
  if (provider.api_base_url.includes('openai') || provider.api_base_url.includes('deepseek') || provider.api_base_url.includes('openrouter')) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (provider.api_base_url.includes('generativelanguage.googleapis.com')) {
    headers['x-goog-api-key'] = apiKey;
  } else {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  
  console.log(`[DEBUG] Testing ${provider.name}/${model} with key ${apiKey.slice(0,8)}...`);
  console.log(`[DEBUG] Request URL: ${url}`);
  console.log(`[DEBUG] Request method: ${method}`);
  console.log(`[DEBUG] Request headers: ${JSON.stringify(headers)}`);
  console.log(`[DEBUG] Request body: ${body || 'NO_BODY'}`);
  console.log(`[DEBUG] Proxy method: ${process.env.PROXY_URL ? 'undici-ProxyAgent' : 'direct'}`);
  console.log(`[DEBUG] Proxy URL: ${process.env.PROXY_URL || 'NONE'}`);
  
  const start = Date.now();
  try {
    const fetchOptions: any = { method, headers };
    if (body) fetchOptions.body = body;
    
    console.log(`[DEBUG] Final fetch options: ${JSON.stringify(fetchOptions, null, 2)}`);
    console.log(`[DEBUG] Making fetch request with undici proxy support...`);
    
    // 使用原生 fetch，undici ProxyAgent 会自动拦截代理
    const res = await fetch(url, fetchOptions);
    const text = await res.text();
    let json: any = null;
    try { json = JSON.parse(text); } catch {}
    if (res.ok) {
      console.log(`[SUCCESS] Provider: ${provider.name} | Model: ${model} | Key: ${apiKey.slice(0,8)}... | ${res.status} ${res.statusText} (${Date.now()-start}ms)`);
    } else {
      console.error(`[FAIL] Provider: ${provider.name} | Model: ${model} | Key: ${apiKey.slice(0,8)}... | ${res.status} ${res.statusText}`);
      console.error(`  URL: ${url}`);
      console.error(`  Request: ${body || ''}`);
      console.error(`  Response: ${text}`);
    }
    return { ok: res.ok, status: res.status, statusText: res.statusText, json, text };
  } catch (err: any) {
    console.error(`[ERROR] Provider: ${provider.name} | Model: ${model} | Key: ${apiKey.slice(0,8)}...`);
    console.error(`  URL: ${url}`);
    console.error(`  Request: ${body || ''}`);
    console.error(`  Error name: ${err.name}`);
    console.error(`  Error message: ${err.message}`);
    console.error(`  Error code: ${err.code || 'NO_CODE'}`);
    console.error(`  Error cause: ${err.cause || 'NO_CAUSE'}`);
    console.error(`  Full error: ${err.stack || err}`);
    return { ok: false, error: err };
  }
}

// 动态导入，以避免bundler问题
let setGlobalDispatcher: any = null;
let ProxyAgent: any = null;

async function initializeProxySupport() {
  try {
    // 尝试导入 undici，Node.js 18+ 原生支持
    const undici = await import('undici');
    setGlobalDispatcher = undici.setGlobalDispatcher;
    ProxyAgent = undici.ProxyAgent;
    console.log(`[DEBUG] undici imported successfully for proxy support`);
    return true;
  } catch (undiciError) {
    console.log(`[DEBUG] undici not available: ${undiciError.message}`);
    return false;
  }
}

async function main() {
  const config = loadConfig();
  
  // 自动设置代理环境变量
  if (config.PROXY_URL && !process.env.PROXY_URL) {
    process.env.PROXY_URL = config.PROXY_URL;
    console.log(`[INFO] Set PROXY_URL from config: ${config.PROXY_URL}`);
  }

  console.log(`[DEBUG] === Claude Code Router Test Script Debug Mode ===`);
  console.log(`[DEBUG] Node.js version: ${process.version}`);
  console.log(`[DEBUG] Platform: ${process.platform}`);
  console.log(`[DEBUG] Architecture: ${process.arch}`);

  console.log(`[DEBUG] Environment variables after processing:`);
  console.log(`[DEBUG] process.env.PROXY_URL = ${process.env.PROXY_URL || 'NOT_SET'}`);

  console.log(`[DEBUG] Found ${config.Providers?.length || 0} providers`);

  // 设置代理
  if (process.env.PROXY_URL) {
    console.log(`[DEBUG] Proxy URL detected: ${process.env.PROXY_URL}`);
    if (process.env.PROXY_URL.startsWith('socks')) {
      console.error(`[ERROR] socks5 proxy not supported in test script!`);
      console.error(`[ERROR] Please use HTTP proxy instead of: ${process.env.PROXY_URL}`);
      console.error(`[ERROR] Example: http://proxy.example.com:8080`);
      console.error(`[ERROR] Or remove PROXY_URL to test without proxy`);
      process.exit(1);
    } else {
      console.log(`[DEBUG] Using HTTP proxy with undici ProxyAgent...`);
      
      const proxyInitialized = await initializeProxySupport();
      if (proxyInitialized && setGlobalDispatcher && ProxyAgent) {
        try {
          const proxyAgent = new ProxyAgent(process.env.PROXY_URL);
          setGlobalDispatcher(proxyAgent);
          console.log(`[INFO] undici ProxyAgent enabled, proxy: ${process.env.PROXY_URL}`);
          console.log(`[DEBUG] HTTP proxy setup completed with undici`);
        } catch (proxyError) {
          console.error(`[ERROR] Failed to setup undici ProxyAgent: ${proxyError.message}`);
          process.exit(1);
        }
      } else {
        console.error(`[ERROR] undici ProxyAgent not available, cannot setup proxy`);
        console.error(`[ERROR] Node.js version: ${process.version}`);
        process.exit(1);
      }
    }
  } else {
    console.log(`[DEBUG] No proxy configured`);
  }
  
  for (const provider of config.Providers || config.providers || []) {
    console.log(`[DEBUG] Processing provider: ${provider.name}`);
    const apiKeys = getApiKeys(provider);
    console.log(`[DEBUG] Provider ${provider.name} has ${apiKeys.length} API keys`);
    if (!apiKeys.length) {
      console.warn(`Provider ${provider.name} has no API keys, skipped.`);
      continue;
    }
    for (const model of provider.models) {
      console.log(`[DEBUG] Testing model: ${model}`);
      for (const apiKey of apiKeys) {
        const result = await testProviderModelKey(provider, model, apiKey);
        if (result.ok) break; // 如果这个 API Key 成功了，就不用测试其他的了
      }
    }
  }
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
}); 