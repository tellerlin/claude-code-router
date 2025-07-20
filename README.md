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
- **Backward Compatibility**: All original features remain unchanged

### 🔗 Links

- **Original Project**: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
- **This Fork**: [tellerlin/claude-code-router](https://github.com/tellerlin/claude-code-router)
- **Detailed Usage Guide**: [使用说明.md](使用说明.md)
- **API Key Rotation Documentation**: [API_KEY_ROTATION_README.md](API_KEY_ROTATION_README.md)

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
-   **Status Monitoring**: Real-time monitoring of API key rotation status via `ccr rotation` command

## 🚀 Getting Started

### 1. Installation

First, ensure you have [Claude Code](https://docs.anthropic.com/en/docs/claude-code/quickstart) installed:

```shell
npm install -g @anthropic-ai/claude-code
```

Then, install Claude Code Router:

```shell
# Install this fork version with API Key rotation
npm install -g @tellerlin/claude-code-router

# Or install original version
npm install -g @musistudio/claude-code-router
```

### 2. Configuration

Create and configure your `~/.claude-code-router/config.json` file. Refer to `config.example.json` or `config.example.with-rotation.json`.

### 3. Running

```shell
ccr code
```

## 📖 Documentation

- **[使用说明.md](使用说明.md)** - Complete usage guide and configuration instructions
- **[API_KEY_ROTATION_README.md](API_KEY_ROTATION_README.md)** - Detailed API Key rotation documentation
- **[Project Motivation and How It Works](blog/en/project-motivation-and-how-it-works.md)** - Project background and technical principles
- **[Maybe We Can Do More with the Router](blog/en/maybe-we-can-do-more-with-the-route.md)** - Extended functionality discussion

## 🤖 GitHub Actions

Configure in `.github/workflows/claude.yaml`:

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

## ❤️ Support & Sponsoring

**This is a fork of the original project. Please support the original author:**

- **Original Project**: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
- **Support Original Author**: If you find this project helpful, please consider sponsoring the original development at the [original repository](https://github.com/musistudio/claude-code-router).

### Original Project Sponsors

A huge thank you to all the original project sponsors for their generous support!

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

(If your name is masked, please contact the original author via their homepage email to update it with your GitHub username.)
