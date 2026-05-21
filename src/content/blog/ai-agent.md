---
title: 'AI Agent 学习资源整理'
date: 2026-05-21
description: 'AI Agent 全栈学习资料汇总，涵盖 Claude Code 配置、DeepSeek 接入、Skills 技能、MCP/A2A 协议等核心内容。'
tags: ['AI', 'Claude Code', 'DeepSeek', 'Agent']
---

# AI Agent

- [AI Agent全栈课程](https://github.com/Callous-0923/agent-study)
- [Claude Code 教程](https://www.runoob.com/claude-code/claude-code-tutorial.html)

## Skills

- [Skills 技能](https://www.skills.sh/):
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

