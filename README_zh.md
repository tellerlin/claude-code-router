# Claude Code Router

> 一款强大的工具，可将 Claude Code 请求路由到不同的模型，并自定义任何请求。

## 📋 Fork 信息

这是 [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) 的 Fork 版本，新增了 **API Key 轮询** 功能。

### 🆕 本 Fork 新增功能

- **API Key 轮询**: 支持多个 API Key 的自动轮询
- **多种轮询策略**: round_robin、random、weighted、least_used
- **智能错误处理**: 自动重试、失败计数、冷却机制
- **状态监控**: 实时监控 API Key 轮询状态
- **增强 CLI**: 改进的命令行界面，提供详细状态信息
- **后台服务**: 自动服务管理，正确清理资源
- **全面测试**: 内置 API Keys 和模型测试功能

### 🔗 相关链接

- **原始项目**: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
- **本 Fork**: [tellerlin/claude-code-router](https://github.com/tellerlin/claude-code-router)

![](blog/images/claude-code.png)

## ✨ 功能

### 原始功能
-   **模型路由**: 根据您的需求将请求路由到不同的模型（例如，后台任务、思考、长上下文）。
-   **多提供商支持**: 支持 OpenRouter、DeepSeek、Ollama、Gemini、Volcengine 和 SiliconFlow 等各种模型提供商。
-   **请求/响应转换**: 使用转换器为不同的提供商自定义请求和响应。
-   **动态模型切换**: 在 Claude Code 中使用 `/model` 命令动态切换模型。
-   **GitHub Actions 集成**: 在您的 GitHub 工作流程中触发 Claude Code 任务。
-   **插件系统**: 使用自定义转换器扩展功能。

### 🆕 本 Fork 新增功能
-   **API Key 轮询**: 支持多个 API Key 的自动轮询和负载均衡
-   **多种轮询策略**: round_robin、random、weighted、least_used
-   **智能错误处理**: 自动重试、失败计数、冷却机制
-   **状态监控**: 通过 `ccr status` 和 `ccr rotation` 命令实时监控 API Key 轮询状态
-   **增强测试**: 通过 `ccr test` 命令对所有模型和 API Keys 进行全面测试
-   **后台服务管理**: 正确的服务生命周期管理，自动启动和清理

## 🚀 快速开始

### 1. 安装

首先，请确保您已安装 [Claude Code](https://docs.anthropic.com/en/docs/claude-code/quickstart)：

```shell
npm install -g @anthropic-ai/claude-code
```

然后，安装 Claude Code Router：

```shell
npm install -g @tellerlin/claude-code-router
```

### 2. 配置

#### 快速设置（推荐）
```bash
# 使用自动设置命令
ccr setup
```

这将自动：
- 创建配置目录（`~/.claude-code-router/`）
- 生成模板配置文件
- 提供设置说明

#### 手动设置（替代方案）
如果您喜欢手动设置：

**创建配置目录**
```bash
mkdir -p ~/.claude-code-router
```

**复制配置模板**
```bash
# 从已安装包中复制轮询配置模板
cp $(npm root -g)/@tellerlin/claude-code-router/config.example.with-rotation.json ~/.claude-code-router/config.json
```

**替代方法：**
```bash
# 查找包位置
npm root -g

# 然后从实际 npm 全局路径复制
cp /usr/local/lib/node_modules/@tellerlin/claude-code-router/config.example.with-rotation.json ~/.claude-code-router/config.json
```

#### 编辑配置
```bash
# 用您喜欢的编辑器编辑配置文件
nano ~/.claude-code-router/config.json
# 或
vim ~/.claude-code-router/config.json
# 或
code ~/.claude-code-router/config.json
```

### 3. 基本配置示例

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

> **重要说明：**
> - 所有 provider **必须** 使用 `api_keys`（数组格式），即使只有一个 key
> - `APIKEY` 字段是可选的，用于全局身份验证
> - 代理支持：仅支持 HTTP/HTTPS 代理（主服务不支持 SOCKS5）

## 🎮 使用方法

### 基本命令

```bash
# 启动后台服务
ccr start

# 停止后台服务
ccr stop

# 查看服务状态和 API Key 轮询信息
ccr status

# 查看详细的 API Key 轮询状态
ccr rotation

# 执行 Claude Code（如需要会自动启动服务）
ccr code "写一个 Hello World 程序"

# 测试 config.json 中的所有模型和 API Keys
ccr test

# 初始化配置
ccr setup

# 查看版本
ccr -v

# 查看帮助
ccr -h
```

### 服务管理

Claude Code Router 作为后台服务运行：

- **`ccr start`**: 启动后台服务（运行在端口 3456）
- **`ccr stop`**: 停止后台服务
- **`ccr status`**: 查看服务状态，包括 API Key 轮询信息
- **`ccr code`**: 执行 Claude Code 命令（如需要会自动启动服务）

### 测试和验证

```bash
# 测试所有配置的 API Keys 和模型
ccr test
```

此命令将：
- 测试配置中的每个 API Key 和模型组合
- 显示每个 key 的详细状态（成功/失败）
- 显示响应时间和错误消息
- 提供可用与失败 keys 的摘要

### 详细状态监控

```bash
# 查看基本服务状态
ccr status

# 查看详细的 API Key 轮询状态
ccr rotation
```

状态命令显示：
- 服务运行状态（PID）
- API Key 轮询配置
- 各个 key 的状态（活跃/非活跃）
- 失败计数和最后使用时间
- 可用与总 keys 数量

## 🔄 API Key 轮询功能

Claude Code Router 支持高级 API Key 轮询，具有多种策略和智能错误处理。

### 基本轮询配置
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

### 高级轮询配置
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

### 轮询策略

- **`round_robin`**（默认）：轮询方式，按顺序使用每个 API Key
- **`random`**: 随机选择，适合高并发场景
- **`weighted`**: 加权轮询，支持不同 API Keys 的权重
- **`least_used`**: 最少使用优先，选择最近最少使用的 Key

### 配置参数

- **`api_keys`**: API Key 列表（字符串数组或对象数组）
- **`enable_rotation`**: 是否启用轮询（默认：true）
- **`rotation_strategy`**: 轮询策略（默认：round_robin）
- **`retry_on_failure`**: 失败时是否重试（默认：true）
- **`max_retries`**: 最大重试次数（默认：3）

#### API Key 对象配置
- **`key`**: API Key 字符串
- **`weight`**: 加权轮询的权重（默认：1）
- **`maxFailures`**: 禁用 Key 前的最大失败次数
- **`cooldownTime`**: 失败后的冷却时间（毫秒）

### 状态监控

使用内置命令监控 API Key 轮询：

```bash
# 基本状态（包含轮询信息）
ccr status

# 详细轮询状态
ccr rotation
```

示例输出：
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

## 🔧 配置详解

### 全局配置

- **`APIKEY`**（可选）：全局访问控制密钥。设置后，所有请求必须在 `Authorization` 头（`Bearer your-key`）或 `x-api-key` 头中包含此密钥
- **`PROXY_URL`**（可选）：HTTP/HTTPS 代理服务器（例如：`"http://127.0.0.1:7890"`）
- **`LOG`**（可选）：启用日志记录到 `$HOME/.claude-code-router.log`
- **`HOST`**（可选）：服务监听地址（如果未设置 `APIKEY`，出于安全考虑默认为 `127.0.0.1`）

### 提供商配置

每个提供商需要：

- **`name`**: 唯一提供商标识符
- **`api_base_url`**: API 端点 URL
- **`api_keys`**: API keys 数组（必需，即使只有一个 key）
- **`models`**: 可用模型列表
- **`transformer`**（可选）：请求/响应转换器配置

### 路由规则

定义不同场景使用的模型：

- **`default`**: 一般任务（推荐：高质量模型）
- **`background`**: 后台/批处理任务（推荐：快速、经济的模型）
- **`think`**: 推理密集型任务（推荐：最强能力模型）
- **`longContext`**: 长对话/文档（推荐：大上下文模型）

### 支持的提供商

- **Gemini**: Google 的 Gemini 模型 API
- **DeepSeek**: DeepSeek Chat 和 Reasoner 模型
- **OpenRouter**: 通过 OpenRouter 访问多种模型
- **Groq**: 高速推理模型
- **SiliconFlow**: 其他模型提供商
- **Volcengine**: 字节跳动的模型平台
- **自定义**: 任何 OpenAI 兼容的 API

## 🔧 内置转换器

转换器处理不同提供商 API 之间的兼容性：

- **`deepseek`**: 适配 DeepSeek API 格式
- **`gemini`**: 适配 Google Gemini API 格式
- **`openrouter`**: 适配 OpenRouter API 格式
- **`groq`**: 适配 Groq API 格式
- **`maxtoken`**: 设置最大 token 限制
- **`tooluse`**: 优化工具调用功能

## 📋 完整配置示例

### 多提供商设置
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

### SiliconFlow 提供商示例
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

## 🎯 高级功能

### 动态模型切换

在 Claude Code 中使用 `/model` 命令切换模型：

```
/model provider_name,model_name
```

示例：
```
/model gemini,gemini-2.5-pro
/model deepseek,deepseek-reasoner
/model openrouter,anthropic/claude-3.5-sonnet
```

### 传递参数给 Claude Code

支持所有 Claude Code 参数：

```bash
# 跳过权限提示
ccr code --dangerously-skip-permissions

# 获取 Claude Code 帮助
ccr code --help

# 直接命令
ccr code "解释这个代码库"
```

## 🔍 常见问题

### Q: 如何检查我的 API keys 是否正常工作？

**A**: 使用内置测试命令：
```bash
ccr test
```
这会测试所有 API keys 和模型，显示详细结果。

### Q: 如果 API key 失败了怎么办？

**A**: 轮询系统会自动：
- 切换到下一个可用的 key
- 跟踪失败计数
- 实施冷却期
- 重试失败的请求

### Q: 如何监控 API key 状态？

**A**: 使用状态命令：
```bash
ccr status      # 基本状态
ccr rotation    # 详细轮询状态
```

### Q: 可以使用不同的轮询策略吗？

**A**: 可以！支持的策略：
- `round_robin`: 顺序轮询
- `random`: 随机选择
- `weighted`: 基于权重
- `least_used`: 最少使用

### Q: 如何启用日志记录？

**A**: 在配置中设置 `"LOG": true`。日志保存到 `$HOME/.claude-code-router.log`。

### Q: 代理支持如何？

**A**: 支持通过 `PROXY_URL` 使用 HTTP/HTTPS 代理。SOCKS5 仅在测试命令中支持，主服务不支持。

## 🛠️ 故障排除

### 服务无法启动

1. **检查配置**：
   ```bash
   # 验证配置文件存在且 JSON 有效
   cat ~/.claude-code-router/config.json | jq .
   ```

2. **测试 API keys**：
   ```bash
   ccr test
   ```

3. **检查端口可用性**：
   ```bash
   netstat -tulpn | grep 3456
   # 或
   lsof -i :3456
   ```

4. **查看日志**（如果启用了日志记录）：
   ```bash
   tail -f ~/.claude-code-router.log
   ```

### API Key 问题

1. **测试单个 keys**：
   ```bash
   ccr test
   ```

2. **检查轮询状态**：
   ```bash
   ccr rotation
   ```

3. **重置服务**（清除 key 失败计数）：
   ```bash
   ccr stop
   ccr start
   ```

### 网络问题

1. **测试连接性**：
   ```bash
   curl -I https://generativelanguage.googleapis.com
   ```

2. **使用代理测试**：
   ```bash
   curl --proxy http://127.0.0.1:7890 -I https://generativelanguage.googleapis.com
   ```

3. **检查 config.json 中的代理配置**

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎贡献！请随时提交 issues 和 pull requests。

### 开发

```bash
# 克隆仓库
git clone https://github.com/tellerlin/claude-code-router.git
cd claude-code-router

# 安装依赖
npm install

# 构建项目
npm run build

# 本地测试
node dist/cli.js --help
```

## 🙏 致谢

- [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) - 原始项目
- [Anthropic](https://anthropic.com) - Claude Code
- [@musistudio/llms](https://github.com/musistudio/llms) - LLM 兼容性库