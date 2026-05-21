---
title: 'AI Agent 学习资源整理'
date: 2026-05-21
description: 'AI Agent 全栈学习资料汇总，涵盖 Claude Code 配置、DeepSeek 接入、Skills 技能、MCP/A2A 协议等核心内容。'
tags: ['AI', 'Claude Code', 'DeepSeek', 'Agent']
---

# AI Agent

## 定义
> AI Agent (AI 智能体) 是一种通过使用可用工具设计`工作流`来自主执行任务的系统。

## AI Agent 的工作原理
> AI agent (AI 智能体) 的核心是`大语言模型 (LLM)`。因此，AI agent (AI 智能体) 通常被称为 LLM 智能体。
> 传统的 LLM（例如 `IBM® Granite 模型`）根据用于训练它们的数据生成响应，并且受知识和推理限制。
> 相比之下，智能体技术通过`工具调用`在后台获取最新信息、优化工作流并自主创建子任务，从而实现复杂的目标。

## 文档
- [《从零开始构建智能体》](https://github.com/datawhalechina/hello-agents)
- [AI Agent全栈课程](https://github.com/Callous-0923/agent-study)
- [Claude Code 教程](https://www.runoob.com/claude-code/claude-code-tutorial.html)

## 通信协议

### MCP — 智能体与工具的桥梁

1️⃣ 概念
> MCP（Model Context Protocol）由 Anthropic 团队提出，其核心设计理念是`标准化智能体与外部工具/资源的通信方式`。
> MCP 的设计哲学是"上下文共享"。它不仅仅是一个 RPC（远程过程调用）协议，更重要的是它允许智能体和工具之间共享丰富的上下文信息。

2️⃣ MCP 设计思想
<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-1.png" width="100%">

### A2A — 智能体间的对话

1️⃣ 概念
> A2A（Agent-to-Agent Protocol）协议由 Google 团队提出，其核心设计理念是`实现智能体之间的点对点通信`。
> A2A 关注的是智能体之间如何相互协作。
> A2A 的设计哲学是"对等通信"。在 A2A 网络中，每个智能体既是服务提供者，也是服务消费者。
> 智能体可以主动发起请求，也可以响应其他智能体的请求。这种对等的设计避免了中心化协调器的瓶颈，让智能体网络更加灵活和可扩展。

2️⃣ A2A 设计思想

<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-2.png" width="100%">

### ANP - 智能体网络的基础设施

1️⃣ 概念
> ANP（Agent Network Protocol）是一个概念性的协议框架，目前由开源社区维护，还没有成熟的生态，其核心设计理念是`构建大规模智能体网络的基础设施`。
> 如果说 MCP 解决的是"如何访问工具"，A2A 解决的是"如何与其他智能体对话"，那么 ANP 解决的是"如何在大规模网络中发现和连接智能体"。
> ANP 的设计哲学是"去中心化服务发现"。在一个包含成百上千个智能体的网络中，如何让智能体能够找到它需要的服务？
> ANP 提供了服务注册、发现和路由机制，让智能体能够动态地发现网络中的其他服务，而不需要预先配置所有的连接关系。


2️⃣ ANP 设计思想

<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-3.png" width="100%">

## Skills

- [Skills 技能](https://www.skills.sh/)
> 技能是人工智能代理可重用的功能。只需一条命令即可安装技能，从而增强代理对程序知识的访问权限。

### skill-creator
- [skill-creator 使用](https://www.runoob.com/claude-code/skill-creator-usage.html)
- [用 skill-creator 创建 Skill](https://www.runoob.com/claude-code/skill-creator-usage.html)
- [skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)

### AI 可视化管理

- [CC Switch统一管理你的 AI 编程工具工作流](https://ccswitch.io/zh/)

## Claude Code 配置使用 DeepSeek

### Claude Code 参考资料

- [安装 Claude Code](https://code.claude.com/docs/zh-CN/quickstart)
- [Claude Code DeepSeek 配置](https://www.runoob.com/claude-code/claude-code-deepseek.html)
- [DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api): Anthropic API
- [DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/guides/coding_agents)：接入 Agent 工具
- [接入 Claude Code](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)
- [VS Code 安装 Claude Code](https://www.runoob.com/claude-code/vscode-install-claude-code.html)
> VSCode 勾选 Disable Login Prompt 配置来关闭登录页面
- [DeepSeek 开发平台](https://platform.deepseek.com/sign_in)

### 用户级配置

1️⃣ 进入个人配置目录

```txt
C:\Users\你的用户名\.claude\settings.json
```

```sh
~/.claude/settings.json #用户级配置（全局）
```

2️⃣ `C:\Users\你的用户名\.claude\settings.json` 中配置

```json
{
  "theme": "dark",
  "model": "deepseek-v4-pro",
  "hasCompletedOnboarding": true,
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的DeepSeek API Key",
    "ANTHROPIC_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-pro",
    "DISABLE_NON_ESSENTIAL_MODEL_CALLS": "1",
    "DISABLE_TELEMETRY": "1"
  },
  "effortLevel": "high"
}
```

### vscode 级别配置

1️⃣ 进入配置（将环境变量配置到插件的 settings.json）

```
打开设置 
-> ClaudeCode 
-> 在 Claude Code 扩展设置页面，点击右上角的 "打开设置(JSON)" 图标 
-> 在 settings.json 中添加以下配置
```

2️⃣ 配置json

```json
{
  "claude-code.environmentVariables": [
    {
      "name": "ANTHROPIC_BASE_URL",
      "value": "https://api.deepseek.com/anthropic"
    },
    {
      "name": "ANTHROPIC_AUTH_TOKEN",
      "value": "sk-你的DeepSeek API Key"
    },
    {
      "name": "ANTHROPIC_MODEL",
      "value": "deepseek-v4-pro"
    },
    {
      "name": "ANTHROPIC_DEFAULT_OPUS_MODEL",
      "value": "deepseek-v4-pro"
    },
    {
      "name": "ANTHROPIC_DEFAULT_SONNET_MODEL",
      "value": "deepseek-v4-pro"
    },
    {
      "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL",
      "value": "deepseek-v4-flash"
    },
    {
      "name": "CLAUDE_CODE_SUBAGENT_MODEL",
      "value": "deepseek-v4-flash"
    },
    {
      "name": "CLAUDE_CODE_EFFORT_LEVEL",
      "value": "max"
    }
  ]
}
```

### 项目级配置

1️⃣ 进入配置

```txt
<你的项目文件夹>/.claude/settings.json
```

```sh
code ./.claude/settings.json # 打开 claude 配置文件进行配置
```

2️⃣ 配置json

```json
{
  "model": "deepseek-v4-pro",
  "hasCompletedOnboarding": true,
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "apiKey",
    "ANTHROPIC_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-pro",
    "DISABLE_NON_ESSENTIAL_MODEL_CALLS": "1",
    "DISABLE_TELEMETRY": "1"
  },
  "effortLevel": "high"
}
```

### Claude Code 切换到终端模式
- [Claude Code 在 VS Code 中切换到终端模式](https://code.claude.com/docs/zh-CN/vs-code#切换到终端模式)
- [VS Code 命令和快捷键](https://code.claude.com/docs/zh-CN/vs-code#vs-code-命令和快捷键)

