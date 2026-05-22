---
title: "Agent Skills"
date: 2026-05-22
description: "Agent 是智能体，Skills 是技能的意思，Agent Skills（智能体技能）是将专业知识、工作流规范固化为可复用资产的核心工具。"
tags: ["Skill", "Skills 技能", "skill-creator"]
---

# Agent Skills（智能体技能）

1️⃣ 概念

> Agent 是智能体，Skills 是技能的意思，Agent Skills（智能体技能）是将专业知识、工作流规范固化为可复用资产的核心工具。
> Agent Skills 本质上是一个模块化的 Markdown 文件，能教会 AI 工具 （如 Claude、GitHub Copilot、Cursor 等） 执行特定任务，且支持自动触发、团队共享与工程化管理，彻底告别重复的提示词输入。

2️⃣ Agent Skills 的本质

- Agent Skills（代理技能）是可重用的指令集，用于扩展编码代理的功能。
- `Agent Skills = 行为规范 + 专业知识 + 使用时机的组合`

## Agent Skills 的工作原

Agent Skills 的关键是渐进式披露，分三层加载

- **层级 1：技能发现**
  > AI 先读取所有技能的元数据（name 和 description），判断任务是否相关，这些元数据始终在系统提示中。
- **层级 2：加载核心指令**
  > 如果相关，AI 自动读取 `SKILL.md` 的正文内容，获取详细指导。
- **层级 3：加载资源文件**
  > 只在需要时读取额外文件（如脚本、示例），或通过工具执行脚本。

## Skill 执行流程

- 从用户指令开始，先进行 `Skill` 意图识别，决定是否进入受控执行路径。
- 命中 `Skill` 后，系统加载 `SKILL.md`，建立工具权限与行为边界，再结合上下文进行推理。
- 只有在确实需要时才调用被允许的外部工具，否则在规则内完成逻辑。
- 最终结果经过约束整合后输出，用户的下一次输入触发新一轮完整流程。

<img src="https://www.runoob.com/wp-content/uploads/2026/01/claude-agent-skills-runoob.png" width="100%" alt="Skill 执行流程">

## 培养技能

> 技能目录包含一个 `SKILL.md` 文件，该文件带有 `YAML` 前置元数据

### 必填字段

- `name`：唯一标识符（小写，允许使用连字符）
- `description`：简要说明该技能的作用

### 选填字段

> `metadata.internal` ：设置为 `true` 可将技能从常规发现列表中隐藏。
> 内部技能仅在设置 `INSTALL_INTERNAL_SKILLS=1` 时可见且可安装。
> 适用于正在开发中的技能或仅供内部工具使用的技能。

```md
---
name: my-internal-skill
description: An internal skill not shown by default
metadata:
  internal: true
---
```

### Example

```md
---
name: my-skill
description: What this skill does and when to use it
---

# My Skill

Instructions for the agent to follow when this skill is activated.

## When to Use

Describe the scenarios where this skill should be used.

## Steps

1. First, do this
2. Then, do that
```

## Agent Skills 相关资源整理

| 资源说明                          | 链接                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| skills.sh 开放代理技能生态系统    | [skills.sh](https://www.skills.sh/)                                                                                   |
| Skills 教程                       | [Skills 教程](https://www.runoob.com/ai-agent/skills-agent.html)                                                      |
| skill-creator                     | [skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)                         |
| 自动生成 Skill 的 Skill           | [自动生成 Skill 的 Skill](https://github.com/anthropics/skills/tree/main/skills/skill-creator)                        |
| 用 skill-creator 创建 Skill       | [用 skill-creator 创建 Skill](https://www.runoob.com/claude-code/skill-creator-usage.html)                            |
| Skills 市场（中文界面）           | [Skills 市场（中文界面）](https://skillsmp.com/zh)                                                                    |
| Agent Skills 官方标准站点         | [Agent Skills 官方标准站点](https://agentskills.io)                                                                   |
| Anthropic 官方工程文章            | [Anthropic 官方工程文章](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) |
| Anthropic 官方 Skills GitHub 仓库 | [Anthropic 官方 Skills GitHub 仓库](https://github.com/anthropics/skills)                                             |
| Claude 技能精选列表               | [Claude 技能精选列表](https://github.com/ComposioHQ/awesome-claude-skills)                                            |
|                                   |                                                                                                                       |
|                                   |                                                                                                                       |
