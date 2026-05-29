---
title: "Claude Code MCP 完全指南"
date: 2026-05-28
description: "MCP（Model Context Protocol）是让 Claude Code 从一个「只能读写本地文件」的 AI 助手，变成一个「能访问 GitHub、数据库、API、云服务」的超级助手！"
tags: ["Claude Code MCP", "MCP"]
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
        <span class="sg-tag">理解 MCP 概念</span>
        <span class="sg-tag">快速配置 MCP</span>
        <span class="sg-tag">配置方式详解</span>
        <span class="sg-tag">MCP 资源导航</span>
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
        <li>理解 MCP 是什么及为什么需要它</li>
        <li>掌握 MCP 的三个核心组件</li>
        <li>学会快速配置和使用 MCP 服务器</li>
        <li>区分用户级与项目级配置及传输方式</li>
        <li>获取丰富的 MCP 服务器资源列表</li>
      </ul>
    </div>
  </div>
</div>

## 为什么使用 MCP

### 无 MCP 的 Claude Code

```sh
你能做的：
✓ 读取本地文件
✓ 编辑代码
✓ 运行命令
✓ 使用 Bash 工具

你不能做的：
✗ 查看你的 GitHub Issues
✗ 访问云数据库
✗ 调用外部 API
✗ 获取实时天气
```

### 有 MCP 的 Claude Code

```sh
你能做的：
✓ 所有原来的功能
✓ 查看/创建 GitHub Issues 和 PR
✓ 查询 SQLite、PostgreSQL 数据库
✓ 访问 Notion、Slack 等外部服务
✓ 获取实时天气、地图数据
✓ 浏览器自动化
✓ ...以及更多！
```

## MCP是什么

> MCP（Model Context Protocol 模型上下文协议）是一种用于将 AI 应用程序连接到外部系统的开源标准。

## MCP 的核心组件
MCP 的架构主要包括三个部分

- `MCP Host` —— 通常是 AI 模型（如 Claude等）或 Agent 的运行环境，负责发起请求。
- `MCP Client` —— Host 的代理层，处理与 Server 的通信。
- `MCP Server` —— 工具或数据源的提供端，通过标准化接口暴露资源和功能。

## 快速开始

### 1. 了解配置文件位置

Claude Code 的 MCP 配置文件位于

| 级别   | 配置文件路径     | 作用范围 |
| ------ | ---------------- | -------- |
| 用户级 | `~/.claude.json`   | 所有项目 |
| 项目级 | `.claude/mcp.json` | 当前项目 |

> 推荐优先使用项目级配置，让不同项目使用不同的 MCP 服务。

### 2. 用自然语言添加 MCP 服务器
1️⃣ 配置文件位置
```sh
.claude/mcp.json
```

2️⃣ 自然语言创建 MCP 服务器
```md
输入：帮我添加 GitHub MCP 服务器，我的 token 是 ghp_xxx
```

### 3. 验证配置

1️⃣ 直接询问 Claude Code

```sh
input：现在有哪些可用的 MCP 服务器？

Claude：当前已配置的 MCP 服务器
• github - GitHub 集成
• sqlite - SQLite 数据库
• filesystem - 文件系统访问
```

2️⃣ 使用诊断命令

```sh
/doctor
```

### 4. 开始使用
> 配置成功后，直接用自然语言调用 MCP 功能

## 配置方式详解
### 用户级配置（全局）

1️⃣ 配置文件 `~/.claude.json`

```json 
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```
### 项目级配置（推荐）

1️⃣ 配置文件 `.claude/mcp.json`

```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"]
    }
  }
}
```

2️⃣ 项目级配置优势
- 团队成员可以共享配置（提交到 Git）
- 不同项目使用不同的 MCP 服务
- 配置更灵活，不会污染全局设置

### 传输方式配置
- STDIO（本地进程）
- HTTP（远程服务）
- SSE（服务器推送）

## MCP 服务器资源
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers): 最全面的 MCP 服务器列表
- [LobeHub MCP](https://lobehub.com/zh/mcp): 中文 MCP 目录
- [smithery.ai](https://smithery.ai/): MCP 服务器市场
- [awesome-mcp-servers](https://glama.ai/mcp/servers): 精选的优秀模型上下文协议 (MCP) 服务器列表
- [modelcontextprotocol](https://modelcontextprotocol.io/docs/getting-started/intro): 若要查找 MCP 服务器列表，可浏览 MCP 注册表上已发布的服务器
- [官方 MCP 注册](https://registry.modelcontextprotocol.io/)