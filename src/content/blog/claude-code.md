---
title: 'Claude Code 快速上手指南'
date: 2026-05-22
description: 'Claude Code 是 Anthropic 官方出品的 AI 原生编码工具，它将大型语言模型的能力直接集成到终端中，让你可以用自然语言与 AI 协作完成编程任务。不同于传统的代码补全工具，Claude Code 能够理解整个项目的上下文，执行复杂的开发任务，从代码生成到重构、从调试到文档编写，它都能胜任。'
tags: ['AI', 'Claude Code', 'Claude Code 参考资料']
---

## 本节导读

<div class="sg-card">
  <div class="sg-body">
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">🎯</div>
        <div class="sg-item-label">学习目标</div>
      </div>
      <div class="sg-tags">
        <span class="sg-tag">Claude Code 配置</span>
        <span class="sg-tag">DeepSeek 接入</span>
        <span class="sg-tag">三级配置体系</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">10</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>配置 Claude Code</li>
        <li>接入 DeepSeek API</li>
        <li>理解三级配置体系</li>
      </ul>
    </div>
  </div>
</div>

## 快速安装

1️⃣ npm 安装

```sh
# 全局安装 Claude Code CLI
# 使用 -g 参数将命令安装到全局，这样在任何目录都能使用
npm install -g @anthropic-ai/claude-code

# 验证安装是否成功
# 如果显示版本号（如 0.1.25），说明安装成功
claude --version
```

2️⃣ Windows PowerShell

```sh
# 原生安装会在后台自动更新，以确保您始终使用最新版本。
irm https://claude.ai/install.ps1 | iex
```

3️⃣ macOS, Linux

```sh
# 原生安装会在后台自动更新，以确保您始终使用最新版本。
curl -fsSL https://claude.ai/install.sh | bash
```

4️⃣ 让 AI Agent 帮你安装
> 若你已经在使用其他 AI 编程助手（如 Cursor/Copilot/Windsurf/...），可以让它们帮你完成安装。

```sh
# 方式一 
帮我装 anthropic 的 claude code

# 方式二
安装 claude code cli，并检查 Node.js 版本是否兼容

# 方式二，AI Agent 会
  # 1.检查当前 Node.js 版本
  # 2.如果不符合要求，提示你升级
  # 3.执行安装命令
  # 4.验证安装结果
  # 5.如有问题，自动尝试修复
```

## 启动 Claude Code
首次启动与初始化：安装完成后，进入你的项目目录启动 Claude Code

```sh
# 进入项目目录（Claude Code 会在当前目录下工作）
cd /path/to/your/project

# 启动 Claude Code
claude
```

## 核心使用技巧

- 技巧 1：双击 Esc 回退对话 —— 撤销误操作
> 在与 AI 协作时，你可能会说错话、给错指令，或者对 AI 的回答不满意。双击 Esc 能让你快速"时光倒流"。

快捷键详解

```txt
按一次 Esc     → 清除当前正在输入的内容（类似 Ctrl+C）
按两次 Esc     → 回退到上一次对话状态（撤销上一轮对话）
按三次 Esc     → 清除所有对话历史（重新开始）
```

## Claude Code 搭配

- [Claude Code 开源地址](https://github.com/anthropics/claude-code)
- [Claude Code 官方文档](https://code.claude.com/docs/zh-CN/overview)
- [DeepSeek Anthropic API](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)
- [智谱大模型接入 Claude Code](ttps://docs.bigmodel.cn/cn/coding-plan/tool/claude#claude-code)

## Claude Code 参考资料

- [Claude Code 教程](https://www.runoob.com/claude-code/claude-code-tutorial.html)
- [安装 Claude Code](https://code.claude.com/docs/zh-CN/quickstart)
- [Claude Code DeepSeek 配置](https://www.runoob.com/claude-code/claude-code-deepseek.html)
- [DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)
- [接入 Claude Code](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)
- [VS Code 安装 Claude Code](https://www.runoob.com/claude-code/vscode-install-claude-code.html)
> VSCode 勾选 Disable Login Prompt 配置来关闭登录页面
- [DeepSeek 开发平台](https://platform.deepseek.com/sign_in)

## 通过 CC Switch 可视化配置
- [Claude Desktop](https://ccswitch.io/zh/docs?section=providers&item=claude-desktop): Claude Desktop 面板用于在 CC Switch 中管理 Claude Desktop 的供应商配置
- [快速上手](https://ccswitch.io/zh/docs?section=getting-started&item=quickstart): 帮助你在 5 分钟内完成首次配置。

## 通过 Terminal 终端配置

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

## Claude Code 切换到终端模式
- [Claude Code 在 VS Code 中切换到终端模式](https://code.claude.com/docs/zh-CN/vs-code#切换到终端模式)
- [VS Code 命令和快捷键](https://code.claude.com/docs/zh-CN/vs-code#vs-code-命令和快捷键)
