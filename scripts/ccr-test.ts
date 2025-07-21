#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';
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

async function testProviderModelKey(provider: Provider, model: string, apiKey: string, agent: any) {
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
  console.log(`[DEBUG] Agent configured: ${agent ? 'YES' : 'NO'}`);
  if (agent) {
    console.log(`[DEBUG] Agent type: ${agent.constructor.name}`);
    console.log(`[DEBUG] Agent proxy: ${agent.proxy || agent.uri || 'UNKNOWN'}`);
  }
  
  const start = Date.now();
  try {
    const fetchOptions: any = { method, headers };
    if (body) fetchOptions.body = body;
    if (agent) fetchOptions.agent = agent;
    
    console.log(`[DEBUG] Final fetch options: ${JSON.stringify(fetchOptions, null, 2)}`);
    console.log(`[DEBUG] Making fetch request with node-fetch...`);
    
    // 使用 node-fetch 而不是原生 fetch，因为原生 fetch 不支持 agent
    let fetch;
    try {
      const nodeFetch = require('node-fetch');
      // 处理 ES6 default export 和 CommonJS 的兼容性
      fetch = nodeFetch.default || nodeFetch;
      console.log(`[DEBUG] Using node-fetch (supports agent parameter)`);
    } catch (nodeFetchError) {
      console.error(`[ERROR] node-fetch not available, falling back to global fetch (may not support proxy)`);
      fetch = globalThis.fetch;
    }
    
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

async function main() {
  console.log(`[DEBUG] === Claude Code Router Test Script Debug Mode ===`);
  console.log(`[DEBUG] Node.js version: ${process.version}`);
  console.log(`[DEBUG] Platform: ${process.platform}`);
  console.log(`[DEBUG] Architecture: ${process.arch}`);
  
  const config = loadConfig();
  
  console.log(`[DEBUG] Environment variables before processing:`);
  console.log(`[DEBUG] process.env.PROXY_URL = ${process.env.PROXY_URL || 'NOT_SET'}`);
  console.log(`[DEBUG] process.env.HTTPS_PROXY = ${process.env.HTTPS_PROXY || 'NOT_SET'}`);
  console.log(`[DEBUG] process.env.HTTP_PROXY = ${process.env.HTTP_PROXY || 'NOT_SET'}`);
  
  // 自动设置代理环境变量
  if (config.PROXY_URL && !process.env.PROXY_URL) {
    process.env.PROXY_URL = config.PROXY_URL;
    console.log(`[INFO] Set PROXY_URL from config: ${config.PROXY_URL}`);
  }
  
  console.log(`[DEBUG] Environment variables after processing:`);
  console.log(`[DEBUG] process.env.PROXY_URL = ${process.env.PROXY_URL || 'NOT_SET'}`);
  
  const providers: Provider[] = config.Providers || config.providers || [];
  console.log(`[DEBUG] Found ${providers.length} providers`);
  if (providers.length === 0) {
    console.error('No Providers found in config.json');
    process.exit(1);
  }
  
  let agent: any = undefined;
  if (process.env.PROXY_URL) {
    console.log(`[DEBUG] Proxy URL detected: ${process.env.PROXY_URL}`);
    if (process.env.PROXY_URL.startsWith('socks')) {
      console.log(`[DEBUG] Creating SocksProxyAgent...`);
      try {
        const { SocksProxyAgent } = require('socks-proxy-agent');
        agent = new SocksProxyAgent(process.env.PROXY_URL);
        console.log(`[INFO] socks-proxy-agent enabled, proxy: ${process.env.PROXY_URL}`);
        console.log(`[DEBUG] SocksProxyAgent created successfully`);
        console.log(`[DEBUG] Agent proxy config: ${agent.proxy || agent.uri || 'UNKNOWN'}`);
      } catch (socksError) {
        console.error(`[ERROR] Failed to create SocksProxyAgent: ${socksError.message}`);
        console.error(`[ERROR] Make sure socks-proxy-agent is installed: npm install socks-proxy-agent`);
      }
    } else {
      console.log(`[DEBUG] Using global-agent for HTTP proxy...`);
      try {
        process.env.GLOBAL_AGENT_HTTP_PROXY = process.env.PROXY_URL;
        require('global-agent/bootstrap');
        console.log(`[INFO] global-agent enabled, proxy: ${process.env.PROXY_URL}`);
      } catch (globalAgentError) {
        console.error(`[ERROR] Failed to setup global-agent: ${globalAgentError.message}`);
      }
    }
  } else {
    console.log(`[DEBUG] No proxy configured`);
  }
  
  for (const provider of providers) {
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
        await testProviderModelKey(provider, model, apiKey, agent);
        // 添加小延迟避免频率限制
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
}); 