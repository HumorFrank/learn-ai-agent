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
- [AI Agent 教程](https://www.runoob.com/ai-agent/ai-agent-intro.html)
- [《从零开始构建智能体》](https://github.com/datawhalechina/hello-agents)
- [AI Agent全栈课程](https://github.com/Callous-0923/agent-study)
- [Claude Code 教程](https://www.runoob.com/claude-code/claude-code-tutorial.html)

## 通信协议

### MCP — 智能体与工具的桥梁

1️⃣ 概念
> MCP（Model Context Protocol）由 Anthropic 团队提出，其核心设计理念是`标准化智能体与外部工具/资源的通信方式`。
> MCP 的设计哲学是"上下文共享"。它不仅仅是一个 RPC（远程过程调用）协议，更重要的是它允许智能体和工具之间共享丰富的上下文信息。

2️⃣ MCP 设计思想
<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-1.png" width="100%" alt="MCP 设计思想">

3️⃣ MCP 协议提供了三大核心能力，构成完整的工具访问框架

| 能力            | 说明             | 使用场景            | 示例                             |
| --------------- | ---------------- | ------------------- | -------------------------------- |
| Tools(工具)     | 可执行的功能     | 执行操作/处理数据   | read_file/search_code/send_email |
| Resources(资源) | 可访问的数据     | 读取数据/订阅变化   | 文件内容/数据库记录/API响应      |
| Prompts(提示词) | 预定义的提示版本 | 标准化任务/最佳实践 | 代码审查提示/文档生成提示        |

4️⃣ 三种能力的区别

> - Tools 是主动的（执行操作）
> - Resources 是被动的（提供数据）
> - Prompts 是指导性的（提供模板）。

### A2A — 智能体间的对话

1️⃣ 概念
> A2A（Agent-to-Agent Protocol）协议由 Google 团队提出，其核心设计理念是`实现智能体之间的点对点通信`。
> A2A 关注的是智能体之间如何相互协作。
> A2A 的设计哲学是"对等通信"。在 A2A 网络中，每个智能体既是服务提供者，也是服务消费者。
> 智能体可以主动发起请求，也可以响应其他智能体的请求。这种对等的设计避免了中心化协调器的瓶颈，让智能体网络更加灵活和可扩展。

2️⃣ A2A 设计思想

<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-2.png" width="100%" alt="A2A 设计思想">

### ANP - 智能体网络的基础设施

1️⃣ 概念
> ANP（Agent Network Protocol）是一个概念性的协议框架，目前由开源社区维护，还没有成熟的生态，其核心设计理念是`构建大规模智能体网络的基础设施`。
> 如果说 MCP 解决的是"如何访问工具"，A2A 解决的是"如何与其他智能体对话"，那么 ANP 解决的是"如何在大规模网络中发现和连接智能体"。
> ANP 的设计哲学是"去中心化服务发现"。在一个包含成百上千个智能体的网络中，如何让智能体能够找到它需要的服务？
> ANP 提供了服务注册、发现和路由机制，让智能体能够动态地发现网络中的其他服务，而不需要预先配置所有的连接关系。


2️⃣ ANP 设计思想

<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-3.png" width="100%" alt="ANP 设计思想">

### 三种协议对比

<img src="https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/10-figures/10-table-1.png" width="100%" alt="MCP/A2A/ANP 协议对比">

> 如何选择合适的协议？
> - 若你的智能体需要访问外部服务（文件、数据库、API）—— 选择 MCP
> - 若你需要多个智能体相互协作完成任务 —— 选择 A2A
> - 若你要构建大规模的智能体生态系统 —— 考虑 ANP

### AI 可视化管理

- [CC Switch统一管理你的 AI 编程工具工作流](https://ccswitch.io/zh/)

