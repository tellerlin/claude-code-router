# Claude Code Router

> 一款强大的工具，可将 Claude Code 请求路由到不同的模型，并自定义任何请求。

## 📋 Fork 信息

这是 [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) 的 Fork 版本，新增了 **API Key 轮询** 功能。

### 🆕 本 Fork 新增功能

- **API Key 轮询**: 支持多个 API Key 的自动轮询
- **多种轮询策略**: round_robin、random、weighted、least_used
- **智能错误处理**: 自动重试、失败计数、冷却机制
- **状态监控**: 实时监控 API Key 轮询状态
- **向后兼容**: 所有原始功能保持不变

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
-   **状态监控**: 通过 `ccr rotation` 命令实时监控 API Key 轮询状态

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

#### 步骤 1: 创建配置目录
```bash
# 创建配置目录
mkdir -p ~/.claude-code-router
```

#### 步骤 2: 复制配置模板
选择以下选项之一：

**选项 A: 基本配置（单个 API Key）**
```bash
# 复制基本配置模板
cp config.example.json ~/.claude-code-router/config.json
```

**选项 B: API Key 轮询配置（多个 API Key）**
```bash
# 复制轮询配置模板
cp config.example.with-rotation.json ~/.claude-code-router/config.json
```

#### 步骤 3: 编辑配置文件
```bash
# 使用您喜欢的编辑器编辑配置文件
nano ~/.claude-code-router/config.json
# 或使用 vim
vim ~/.claude-code-router/config.json
# 或使用 VS Code
code ~/.claude-code-router/config.json
```

#### 步骤 4: 配置您的设置
替换配置文件中的占位符值：

1. **替换 API Keys**: 将 `"sk-xxx"` 替换为您的实际 API keys
2. **更新提供商 URL**: 确保 `api_base_url` 指向您想要的提供商
3. **设置您的密钥**: 将 `"your-secret-key"` 替换为用于身份验证的安全密钥
4. **配置代理**（可选）: 如果需要使用代理，请设置 `PROXY_URL`

#### 步骤 5: 保存并退出
- **对于 nano**: 按 `Ctrl+X`，然后按 `Y`，然后按 `Enter`
- **对于 vim**: 按 `Esc`，输入 `:wq`，然后按 `Enter`
- **对于 VS Code**: 按 `Ctrl+S` 保存，然后关闭编辑器

#### 配置文件位置
- **路径**: `~/.claude-code-router/config.json`
- **示例文件**: 
  - `config.example.json` - 基本配置示例
  - `config.example.with-rotation.json` - 包含API Key轮询的配置示例

#### 基本配置示例

```json
{
  "APIKEY": "your-secret-key",
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "HOST": "0.0.0.0",
  "Providers": [
    {
      "name": "deepseek",
      "api_base_url": "https://api.deepseek.com/chat/completions",
      "api_key": "sk-xxx",
      "models": ["deepseek-chat", "deepseek-reasoner"],
      "transformer": {
        "use": ["deepseek"],
        "deepseek-chat": { "use": ["tooluse"] }
      }
    },
    {
      "name": "openrouter",
      "api_base_url": "https://openrouter.ai/api/v1/chat/completions",
      "api_key": "sk-xxx",
      "models": [
        "google/gemini-2.5-pro-preview",
        "anthropic/claude-3.5-sonnet"
      ],
      "transformer": { "use": ["openrouter"] }
    }
  ],
  "Router": {
    "default": "deepseek,deepseek-chat",
    "background": "ollama,qwen2.5-coder:latest",
    "think": "deepseek,deepseek-reasoner",
    "longContext": "openrouter,google/gemini-2.5-pro-preview"
  }
}
```

### 3. 启动

#### 首次设置
如果这是您第一次运行该工具，它将引导您完成交互式设置：

```bash
ccr code
```

系统将要求您提供：
- 提供商名称
- API 密钥
- 提供商 URL
- 模型名称

#### 正常使用
配置完成后，只需运行：

```bash
ccr code
```

#### 验证安装
检查是否一切正常：

```bash
# 检查服务状态
ccr status

# 检查版本
ccr -v

# 获取帮助
ccr -h
```

## 🔄 API Key 轮询功能

Claude Code Router 现在支持多个 API Key 轮询功能，可以自动在多个 API Key 之间切换，提高可用性和负载均衡。

### 配置方式

#### 1. 基本轮询配置
```json
{
  "name": "gemini",
  "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
  "api_keys": ["sk-xxx1", "sk-xxx2", "sk-xxx3"],
  "enable_rotation": true,
  "rotation_strategy": "round_robin",
  "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
  "transformer": { "use": ["gemini"] }
}
```

#### 2. 高级轮询配置
```json
{
  "name": "gemini",
  "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
  "api_keys": [
    {
      "key": "sk-xxx1",
      "weight": 2,
      "maxFailures": 5,
      "cooldownTime": 60000
    },
    {
      "key": "sk-xxx2",
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

#### 3. 完整配置（包含路由规则）
```json
{
  "APIKEY": "your-secret-key",
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "HOST": "0.0.0.0",
  "Providers": [
    {
      "name": "gemini",
      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
      "api_keys": [
        {
          "key": "sk-xxx1",
          "weight": 2,
          "maxFailures": 5,
          "cooldownTime": 60000
        },
        {
          "key": "sk-xxx2",
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
  ],
  "Router": {
    "default": "gemini,gemini-2.5-pro",
    "background": "gemini,gemini-2.5-flash",
    "think": "gemini,gemini-2.5-pro",
    "longContext": "gemini,gemini-2.5-pro"
  }
}
```

### 轮询策略

- **`round_robin`** (默认): 轮询方式，按顺序使用每个API Key
- **`random`**: 随机选择API Key
- **`weighted`**: 加权轮询，根据权重分配请求
- **`least_used`**: 最少使用优先

### 配置参数说明

- **`api_keys`**: API Key 列表，可以是字符串数组或对象数组
- **`enable_rotation`**: 是否启用轮询功能 (默认: true)
- **`rotation_strategy`**: 轮询策略 (默认: round_robin)
- **`retry_on_failure`**: 失败时是否重试 (默认: true)
- **`max_retries`**: 最大重试次数 (默认: 3)

### 向后兼容性

系统完全支持向后兼容：

- 如果配置了 `api_key`（单个），系统会使用单个API Key模式
- 如果配置了 `api_keys`（多个），系统会启用API Key轮询模式
- 两种模式可以同时存在于不同的提供商中

#### API Key 对象配置
- **`key`**: API Key 字符串
- **`weight`**: 权重，用于加权轮询 (默认: 1)
- **`maxFailures`**: 最大失败次数，超过后禁用该Key
- **`cooldownTime`**: 冷却时间（毫秒），失败后等待时间

### 监控和管理

#### 查看轮询状态
```bash
# 查看基本状态（包含轮询信息）
ccr status

# 查看详细轮询状态
ccr rotation
```

#### 状态信息说明
- **Total Keys**: 总API Key数量
- **Available Keys**: 当前可用的API Key数量
- **Key Status**: 每个API Key的状态
  - ✅ 活跃状态
  - ❌ 禁用状态（超过最大失败次数）
  - 失败次数显示

### 错误处理

- **自动重试**: 当API Key失败时，自动切换到下一个可用的Key
- **失败计数**: 记录每个Key的失败次数
- **冷却机制**: 失败的Key会进入冷却期，避免频繁重试
- **自动恢复**: 成功的请求会重置失败计数

## 🎮 使用方法

### 基本命令

```bash
# 启动服务
ccr start

# 停止服务
ccr stop

# 查看服务状态（包含API Key轮询信息）
ccr status

# 查看详细API Key轮询状态
ccr rotation

# 执行代码命令
ccr code

# 查看版本
ccr -v

# 查看帮助
ccr -h
```

### 服务管理

Claude Code Router 支持后台服务模式：

- **`ccr start`**: 启动后台服务，服务会在端口 3456 上运行
- **`ccr stop`**: 停止后台服务
- **`ccr status`**: 查看服务运行状态和API Key轮询状态
- **`ccr rotation`**: 查看详细的API Key轮询状态，包括每个Key的使用情况和失败次数

### 自动服务启动

当您运行 `ccr code` 时，如果服务未运行，系统会自动启动服务：

```bash
# 如果服务未运行，会自动启动
ccr code "写一个Hello World程序"
```

### 动态模型切换

在 Claude Code 中使用 `/model` 命令切换模型：

```
/model provider_name,model_name
```

示例：
```
/model openrouter,anthropic/claude-3.5-sonnet
/model deepseek,deepseek-reasoner
```

### 传递参数给 Claude Code

Claude Code Router 支持将任何参数传递给原始的 Claude Code。您可以在 `ccr code` 命令后添加任何 Claude Code 支持的参数：

```bash
# 使用 --dangerously-skip-permissions 参数
ccr code --dangerously-skip-permissions

# 传递其他参数
ccr code --help
ccr code "写一个 Hello World 程序"
```

## 🔧 配置详解

### 全局配置项

- **`APIKEY`** (可选): 设置访问密钥，用于身份验证。设置后，客户端请求必须在 `Authorization` 请求头 (例如, `Bearer your-secret-key`) 或 `x-api-key` 请求头中提供此密钥
- **`PROXY_URL`** (可选): 设置代理服务器地址，例如：`"PROXY_URL": "http://127.0.0.1:7890"`
- **`LOG`** (可选): 启用日志记录，日志文件位于 `$HOME/.claude-code-router.log`
- **`HOST`** (可选): 设置服务监听地址。如果未设置 `APIKEY`，出于安全考虑，主机地址将强制设置为 `127.0.0.1`，以防止未经授权的访问

### Providers 配置

每个提供商需要配置以下字段：

- **`name`**: 提供商唯一名称
- **`api_base_url`**: API 端点地址
- **`api_key`**: API 密钥（单个密钥模式）
- **`api_keys`**: API 密钥（轮询模式）
- **`models`**: 可用模型列表
- **`transformer`** (可选): 请求/响应转换器

### Router 配置

路由规则定义不同场景使用的模型：

- **`default`**: 默认模型，用于一般任务（使用 gemini-2.5-pro 获得最佳质量）
- **`background`**: 后台任务模型（使用 gemini-2.5-flash 进行更快、更便宜的处理）
- **`think`**: 思考模型，用于推理密集型任务（使用 gemini-2.5-pro 获得更好的推理能力）
- **`longContext`**: 长上下文模型，处理超过 60K token 的对话（使用 gemini-2.5-pro 进行上下文处理）

#### 智能模型选择策略
- **后台任务**（如代码生成、简单问答）→ **gemini-2.5-flash**（更快、更便宜）
- **复杂推理、分析、创意任务** → **gemini-2.5-pro**（更好的质量、更强的能力）
- **长对话、上下文密集型任务** → **gemini-2.5-pro**（更好的上下文理解）

## 🔧 转换器 (Transformers)

转换器用于处理不同提供商 API 的兼容性问题。

### 内置转换器

- **`deepseek`**: 适配 DeepSeek API
- **`gemini`**: 适配 Gemini API
- **`openrouter`**: 适配 OpenRouter API
- **`groq`**: 适配 Groq API
- **`maxtoken`**: 设置最大 token 数
- **`tooluse`**: 优化工具调用
- **`gemini-cli`** (实验性): 通过 Gemini CLI 支持

## 🔍 常见问题解答

### Q: Gemini 是否支持多个 API Key 轮询？

**A**: **是的！** 现在 Claude Code Router 完全支持多个 API Key 轮询功能。您可以通过以下方式配置：

#### 基本轮询配置
```json
{
  "name": "gemini",
  "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
  "api_keys": ["sk-xxx1", "sk-xxx2", "sk-xxx3"],
  "enable_rotation": true,
  "rotation_strategy": "round_robin",
  "models": ["gemini-2.5-flash", "gemini-2.5-pro"]
}
```

### Q: 如何启用 `--dangerously-skip-permissions` 参数？

**A**: 直接使用以下命令：

```bash
ccr code --dangerously-skip-permissions
```

Claude Code Router 会将所有参数直接传递给原始的 Claude Code，因此支持所有 Claude Code 的原生参数。

### Q: 如何查看日志？

**A**: 在配置文件中设置 `"LOG": true`，日志文件将保存在 `$HOME/.claude-code-router.log`。

### Q: 如何重置API Key状态？

**A**: 目前系统会自动管理API Key状态。失败的Key会在冷却期后自动恢复，或者您可以重启服务来重置所有状态。

### Q: 支持哪些轮询策略？

**A**: 支持4种轮询策略：
- **`round_robin`**: 轮询方式，按顺序使用每个API Key
- **`random`**: 随机选择API Key
- **`weighted`**: 加权轮询，根据权重分配请求
- **`least_used`**: 最少使用优先，选择最近使用最少的Key

## 🛠️ 故障排除

### 服务启动失败

1. **检查配置文件**:
   ```bash
   # 验证配置文件是否存在
   ls -la ~/.claude-code-router/config.json
   
   # 检查 JSON 语法
   cat ~/.claude-code-router/config.json | jq .
   ```

2. **验证 API Keys**:
   ```bash
   # 使用 curl 测试您的 API key（以 DeepSeek 为例）
   curl -X POST "https://api.deepseek.com/chat/completions" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'
   ```

3. **检查网络和代理**:
   ```bash
   # 测试网络连接
   ping api.deepseek.com
   
   # 如果配置了代理，测试代理
   curl --proxy http://127.0.0.1:7890 https://api.deepseek.com
   ```

4. **查看日志**:
   ```bash
   # 在 config.json 中启用日志: "LOG": true
   # 然后检查日志文件
   tail -f ~/.claude-code-router.log
   ```

5. **检查端口占用**:
   ```bash
   # 检查端口 3456 是否被占用
   netstat -tulpn | grep 3456
   # 或者
   lsof -i :3456
   ```

### API Key 轮询问题

1. **所有API Key都不可用**: 检查API Key是否有效，查看失败次数和冷却时间
2. **轮询策略不生效**: 确认 `enable_rotation` 设置为 `true`
3. **重试失败**: 检查 `retry_on_failure` 和 `max_retries` 配置
4. **权重轮询不均衡**: 确认 `weight` 值设置正确

### 模型切换不生效

1. 确认模型名称格式正确：`provider_name,model_name`
2. 检查提供商配置是否正确
3. 验证模型是否在提供商的支持列表中

## 🤖 GitHub Actions

在 `.github/workflows/claude.yaml` 中配置：

```yaml
name: Claude Code

on:
  issue_comment:
    types: [created]

jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Prepare Environment
        run: |
          curl -fsSL https://bun.sh/install | bash
          mkdir -p $HOME/.claude-code-router
          cat << 'EOF' > $HOME/.claude-code-router/config.json
          {
            "log": true,
            "OPENAI_API_KEY": "${{ secrets.OPENAI_API_KEY }}",
            "OPENAI_BASE_URL": "https://api.deepseek.com",
            "OPENAI_MODEL": "deepseek-chat"
          }
          EOF

      - name: Start Claude Code Router
        run: |
          nohup ~/.bun/bin/bunx @tellerlin/claude-code-router@latest start &

      - name: Run Claude Code
        uses: anthropics/claude-code-action@beta
        env:
          ANTHROPIC_BASE_URL: http://localhost:3456
        with:
          anthropic_api_key: "any-string-is-ok"
```

## 📖 深入阅读

- **[项目动机和工作原理](blog/zh/项目初衷及原理.md)** - 项目背景和技术原理
- **[也许我们可以用路由器做更多事情](blog/zh/或许我们能在Router中做更多事情.md)** - 扩展功能讨论

## ❤️ 支持与赞助

**这是原始项目的Fork版本。请支持原始作者：**

- **原始项目**: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
- **支持原始作者**: 如果您觉得这个项目有帮助，请考虑在[原始仓库](https://github.com/musistudio/claude-code-router)赞助原始开发。

### 原始项目赞助商

非常感谢所有原始项目赞助商的慷慨支持！

- @Simon Leischnig
- [@duanshuaimin](https://github.com/duanshuaimin)
- [@vrgitadmin](https://github.com/vrgitadmin)
- @*o
- [@ceilwoo](https://github.com/ceilwoo)
- @*说
- @*更
- @K*g
- @R*R
- [@bobleer](https://github.com/bobleer)
- @*苗
- @*划
- [@Clarence-pan](https://github.com/Clarence-pan)
- [@carter003](https://github.com/carter003)
- @S*r
- @*晖
- @*敏
- @Z*z
- @*然
- [@cluic](https://github.com/cluic)
- @*苗
- [@PromptExpert](https://github.com/PromptExpert)
- @*应
- [@yusnake](https://github.com/yusnake)
- @*飞
- @董*
- *汀
- *涯
- *:-）

（如果您的名字被屏蔽，请通过原始作者的主页电子邮件与他们联系，以便使用您的 GitHub 用户名进行更新。）

## 交流群
<img src="/blog/images/wechat_group.jpg" width="200" alt="wechat_group" />