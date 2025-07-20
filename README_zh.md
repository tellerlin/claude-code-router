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
- **详细使用说明**: [使用说明.md](使用说明.md)
- **API Key 轮询文档**: [API_KEY_ROTATION_README.md](API_KEY_ROTATION_README.md)

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
# 安装包含 API Key 轮询功能的 Fork 版本
npm install -g @tellerlin/claude-code-router

# 或安装原始版本
npm install -g @musistudio/claude-code-router
```

### 2. 配置

创建并配置您的 `~/.claude-code-router/config.json` 文件。参考 `config.example.json` 或 `config.example.with-rotation.json`。

### 3. 启动

```shell
ccr code
```

## 📖 详细文档

- **[使用说明.md](使用说明.md)** - 完整的使用指南和配置说明
- **[API_KEY_ROTATION_README.md](API_KEY_ROTATION_README.md)** - API Key 轮询功能详细文档
- **[项目动机和工作原理](blog/zh/项目初衷及原理.md)** - 项目背景和技术原理
- **[或许我们能在Router中做更多事情](blog/zh/或许我们能在Router中做更多事情.md)** - 扩展功能讨论

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