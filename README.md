# Claude Code Router

[中文版](README_zh.md)

> A powerful tool to route Claude Code requests to different models and customize any request.

## 📋 Fork Information

This is a fork of [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) with additional **API Key Rotation** functionality.

### 🆕 New Features in This Fork

- **API Key Rotation**: Support for multiple API keys with automatic rotation
- **Multiple Rotation Strategies**: round_robin, random, weighted, least_used
- **Smart Error Handling**: Automatic retry, failure counting, cooldown mechanism
- **Status Monitoring**: Real-time monitoring of API key rotation status
- **Enhanced CLI**: Improved command-line interface with detailed status information
- **Background Service**: Automatic service management with proper cleanup
- **Comprehensive Testing**: Built-in testing for all API keys and models

### 🔗 Links

- **Original Project**: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
- **This Fork**: [tellerlin/claude-code-router](https://github.com/tellerlin/claude-code-router)

![](blog/images/claude-code.png)

## ✨ Features

### Original Features
-   **Model Routing**: Route requests to different models based on your needs (e.g., background tasks, thinking, long context).
-   **Multi-Provider Support**: Supports various model providers like OpenRouter, DeepSeek, Ollama, Gemini, Volcengine, and SiliconFlow.
-   **Request/Response Transformation**: Customize requests and responses for different providers using transformers.
-   **Dynamic Model Switching**: Switch models on-the-fly within Claude Code using the `/model` command.
-   **GitHub Actions Integration**: Trigger Claude Code tasks in your GitHub workflows.
-   **Plugin System**: Extend functionality with custom transformers.

### 🆕 New Features in This Fork
-   **API Key Rotation**: Support for multiple API keys with automatic rotation and load balancing
-   **Multiple Rotation Strategies**: round_robin, random, weighted, least_used
-   **Smart Error Handling**: Automatic retry, failure counting, cooldown mechanism
-   **Status Monitoring**: Real-time monitoring of API key rotation status via `ccr status` and `ccr rotation` commands
-   **Enhanced Testing**: Comprehensive testing suite with `ccr test` command for all models and API keys
-   **Background Service Management**: Proper service lifecycle with automatic startup and cleanup

## 🚀 Getting Started

### 1. Installation

First, ensure you have [Claude Code](https://docs.anthropic.com/en/docs/claude-code/quickstart) installed:

```shell
npm install -g @anthropic-ai/claude-code
```

Then, install Claude Code Router:

```shell
npm install -g @tellerlin/claude-code-router
```

### 2. Configuration

#### Quick Setup (Recommended)
```bash
# Use the automatic setup command
ccr setup
```

This will automatically:
- Create the configuration directory (`~/.claude-code-router/`)
- Generate a template configuration file
- Provide setup instructions

#### Manual Setup (Alternative)
If you prefer manual setup:

**Create Configuration Directory**
```bash
mkdir -p ~/.claude-code-router
```

**Copy Configuration Template**
```bash
# Copy the rotation configuration template from the installed package
cp $(npm root -g)/@tellerlin/claude-code-router/config.example.with-rotation.json ~/.claude-code-router/config.json
```

**Alternative method:**
```bash
# Find the package location
npm root -g

# Then copy from the specific path (replace with your actual npm global path)
cp /usr/local/lib/node_modules/@tellerlin/claude-code-router/config.example.with-rotation.json ~/.claude-code-router/config.json
```

#### Edit Configuration
```bash
# Edit the configuration file with your preferred editor
nano ~/.claude-code-router/config.json
# or
vim ~/.claude-code-router/config.json
# or
code ~/.claude-code-router/config.json
```

### 3. Basic Configuration Example

```json
{
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "HOST": "0.0.0.0",
  "Providers": [
    {
      "name": "gemini",
      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
      "api_keys": [
        "YOUR_GEMINI_API_KEY_1",
        "YOUR_GEMINI_API_KEY_2",
        "YOUR_GEMINI_API_KEY_3"
      ],
      "enable_rotation": true,
      "rotation_strategy": "round_robin",
      "retry_on_failure": true,
      "max_retries": 3,
      "models": ["gemini-2.5-pro", "gemini-2.5-flash"],
      "transformer": { "use": ["gemini"] }
    }
  ],
  "Router": {
    "default": "gemini,gemini-2.5-pro",
    "background": "gemini,gemini-2.5-flash",
    "think": "gemini,gemini-2.5-pro",
    "longContext": "gemini,gemini-2.5-pro"
  }
}
```

> **Important Notes:**
> - All providers **must** use `api_keys` (array format), even for a single key
> - The `APIKEY` field is optional for global authentication
> - Proxy support: HTTP/HTTPS proxies only (SOCKS5 not supported in main service)

## 🎮 Usage

### Basic Commands

```bash
# Start background service
ccr start

# Stop background service
ccr stop

# View service status and API key rotation information
ccr status

# View detailed API key rotation status
ccr rotation

# Execute Claude Code (auto-starts service if needed)
ccr code "Write a Hello World program"

# Test all models and API keys in config.json
ccr test

# Initialize configuration
ccr setup

# View version
ccr -v

# View help
ccr -h
```

### Service Management

Claude Code Router operates as a background service:

- **`ccr start`**: Start the background service (runs on port 3456)
- **`ccr stop`**: Stop the background service
- **`ccr status`**: View service status including API key rotation information
- **`ccr code`**: Execute Claude Code commands (automatically starts service if needed)

### Testing and Validation

```bash
# Test all configured API keys and models
ccr test
```

This command will:
- Test every API key and model combination in your configuration
- Show detailed status for each key (success/failure)
- Display response times and error messages
- Provide a summary of working vs failed keys

### Detailed Status Monitoring

```bash
# View basic service status
ccr status

# View detailed API key rotation status
ccr rotation
```

The status commands show:
- Service running status (PID)
- API key rotation configuration
- Individual key status (active/inactive)
- Failure counts and last usage times
- Available vs total keys

## 🔄 API Key Rotation Feature

Claude Code Router supports advanced API key rotation with multiple strategies and smart error handling.

### Basic Rotation Configuration
```json
{
  "name": "gemini",
  "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
  "api_keys": ["key1", "key2", "key3"],
  "enable_rotation": true,
  "rotation_strategy": "round_robin",
  "retry_on_failure": true,
  "max_retries": 3,
  "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
  "transformer": { "use": ["gemini"] }
}
```

### Advanced Rotation Configuration
```json
{
  "name": "gemini",
  "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
  "api_keys": [
    {
      "key": "key1",
      "weight": 2,
      "maxFailures": 5,
      "cooldownTime": 60000
    },
    {
      "key": "key2",
      "weight": 1,
      "maxFailures": 3,
      "cooldownTime": 30000
    }
  ],
  "enable_rotation": true,
  "rotation_strategy": "weighted",
  "retry_on_failure": true,
  "max_retries": 3,
  "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
  "transformer": { "use": ["gemini"] }
}
```

### Rotation Strategies

- **`round_robin`** (default): Round-robin rotation, using each API Key in sequence
- **`random`**: Random selection, suitable for high-concurrency scenarios
- **`weighted`**: Weighted rotation, supporting different weights for API Keys
- **`least_used`**: Least-used priority, selecting the least recently used Key

### Configuration Parameters

- **`api_keys`**: API Key list (string array or object array)
- **`enable_rotation`**: Whether to enable rotation (default: true)
- **`rotation_strategy`**: Rotation strategy (default: round_robin)
- **`retry_on_failure`**: Whether to retry on failure (default: true)
- **`max_retries`**: Maximum retry attempts (default: 3)

#### API Key Object Configuration
- **`key`**: API Key string
- **`weight`**: Weight for weighted rotation (default: 1)
- **`maxFailures`**: Maximum failure count before disabling the Key
- **`cooldownTime`**: Cooldown time (milliseconds) after failure

### Status Monitoring

Monitor API key rotation with built-in commands:

```bash
# Basic status (includes rotation info)
ccr status

# Detailed rotation status
ccr rotation
```

Example output:
```
🚀 Claude Code Router v1.0.68
✅ Service is running (PID: 12345)

📊 API Key Rotation Status:
============================================================

🔧 Provider: gemini
   Strategy: round_robin
   Total Keys: 3
   Available Keys: 3
   Key Status:
     ✅ AIzaSyAV... (0 failures)
     ✅ AIzaSyCf... (0 failures)
     ✅ AIzaSyCd... (0 failures)

============================================================
```

## 🔧 Configuration Details

### Global Configuration

- **`APIKEY`** (optional): Global access control key. When set, all requests must include this key in `Authorization` header (`Bearer your-key`) or `x-api-key` header
- **`PROXY_URL`** (optional): HTTP/HTTPS proxy server (e.g., `"http://127.0.0.1:7890"`)
- **`LOG`** (optional): Enable logging to `$HOME/.claude-code-router.log`
- **`HOST`** (optional): Service listening address (defaults to `127.0.0.1` for security if no `APIKEY` is set)

### Provider Configuration

Each provider requires:

- **`name`**: Unique provider identifier
- **`api_base_url`**: API endpoint URL
- **`api_keys`**: Array of API keys (required, even for single key)
- **`models`**: List of available models
- **`transformer`** (optional): Request/response transformer configuration

### Routing Rules

Define which models to use for different scenarios:

- **`default`**: General tasks (recommended: high-quality model)
- **`background`**: Background/batch tasks (recommended: fast, cost-effective model)
- **`think`**: Reasoning-intensive tasks (recommended: most capable model)
- **`longContext`**: Long conversations/documents (recommended: large context model)

### Supported Providers

- **Gemini**: Google's Gemini models via API
- **DeepSeek**: DeepSeek Chat and Reasoner models
- **OpenRouter**: Access to multiple models via OpenRouter
- **Groq**: High-speed inference models
- **SiliconFlow**: Additional model providers
- **Volcengine**: ByteDance's model platform
- **Custom**: Any OpenAI-compatible API

## 🔧 Built-in Transformers

Transformers handle compatibility between different provider APIs:

- **`deepseek`**: Adapts DeepSeek API format
- **`gemini`**: Adapts Google Gemini API format
- **`openrouter`**: Adapts OpenRouter API format
- **`groq`**: Adapts Groq API format
- **`maxtoken`**: Sets maximum token limits
- **`tooluse`**: Optimizes tool calling functionality

## 📋 Complete Configuration Examples

### Multi-Provider Setup
```json
{
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "HOST": "0.0.0.0",
  "Providers": [
    {
      "name": "gemini",
      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
      "api_keys": ["gemini-key-1", "gemini-key-2"],
      "enable_rotation": true,
      "rotation_strategy": "round_robin",
      "models": ["gemini-2.5-pro", "gemini-2.5-flash"],
      "transformer": { "use": ["gemini"] }
    },
    {
      "name": "deepseek",
      "api_base_url": "https://api.deepseek.com/chat/completions",
      "api_keys": ["deepseek-key-1"],
      "models": ["deepseek-chat", "deepseek-reasoner"],
      "transformer": { "use": ["deepseek"] }
    }
  ],
  "Router": {
    "default": "gemini,gemini-2.5-pro",
    "background": "gemini,gemini-2.5-flash",
    "think": "deepseek,deepseek-reasoner",
    "longContext": "gemini,gemini-2.5-pro"
  }
}
```

### SiliconFlow Provider Example
```json
{
  "name": "siliconflow",
  "api_base_url": "https://api.siliconflow.cn/v1/chat/completions",
  "api_keys": ["your-siliconflow-key"],
  "models": ["moonshotai/Kimi-K2-Instruct"],
  "transformer": {
    "use": ["maxtoken"],
    "max_tokens": 16384
  }
}
```

## 🎯 Advanced Features

### Dynamic Model Switching

Switch models within Claude Code using the `/model` command:

```
/model provider_name,model_name
```

Examples:
```
/model gemini,gemini-2.5-pro
/model deepseek,deepseek-reasoner
/model openrouter,anthropic/claude-3.5-sonnet
```

### Passing Parameters to Claude Code

All Claude Code parameters are supported:

```bash
# Skip permission prompts
ccr code --dangerously-skip-permissions

# Get help for Claude Code
ccr code --help

# Direct commands
ccr code "Explain this codebase"
```

## 🔍 FAQ

### Q: How do I check if my API keys are working?

**A**: Use the built-in test command:
```bash
ccr test
```
This tests all API keys and models, showing detailed results.

### Q: What if an API key fails?

**A**: The rotation system automatically:
- Switches to the next available key
- Tracks failure counts
- Implements cooldown periods
- Retries failed requests

### Q: How do I monitor API key status?

**A**: Use the status commands:
```bash
ccr status      # Basic status
ccr rotation    # Detailed rotation status
```

### Q: Can I use different rotation strategies?

**A**: Yes! Supported strategies:
- `round_robin`: Sequential rotation
- `random`: Random selection
- `weighted`: Based on key weights
- `least_used`: Least recently used

### Q: How do I enable logging?

**A**: Set `"LOG": true` in your config. Logs are saved to `$HOME/.claude-code-router.log`.

### Q: What about proxy support?

**A**: HTTP/HTTPS proxies are supported via `PROXY_URL`. SOCKS5 is only supported in the test command, not the main service.

## 🛠️ Troubleshooting

### Service Won't Start

1. **Check configuration**:
   ```bash
   # Verify config file exists and is valid JSON
   cat ~/.claude-code-router/config.json | jq .
   ```

2. **Test API keys**:
   ```bash
   ccr test
   ```

3. **Check port availability**:
   ```bash
   netstat -tulpn | grep 3456
   # or
   lsof -i :3456
   ```

4. **View logs** (if logging enabled):
   ```bash
   tail -f ~/.claude-code-router.log
   ```

### API Key Issues

1. **Test individual keys**:
   ```bash
   ccr test
   ```

2. **Check rotation status**:
   ```bash
   ccr rotation
   ```

3. **Reset service** (clears key failure counts):
   ```bash
   ccr stop
   ccr start
   ```

### Network Issues

1. **Test connectivity**:
   ```bash
   curl -I https://generativelanguage.googleapis.com
   ```

2. **Test with proxy**:
   ```bash
   curl --proxy http://127.0.0.1:7890 -I https://generativelanguage.googleapis.com
   ```

3. **Check proxy configuration** in config.json

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development

```bash
# Clone the repository
git clone https://github.com/tellerlin/claude-code-router.git
cd claude-code-router

# Install dependencies
npm install

# Build the project
npm run build

# Test locally
node dist/cli.js --help
```

## 🙏 Acknowledgments

- [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) - Original project
- [Anthropic](https://anthropic.com) - Claude Code
- [@musistudio/llms](https://github.com/musistudio/llms) - LLM compatibility library


