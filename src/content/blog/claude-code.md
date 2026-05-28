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

## 核心技巧

技巧 1：**双击 Esc 回退对话 —— 撤销误操作**
> 在与 AI 协作时，你可能会说错话、给错指令，或者对 AI 的回答不满意。双击 Esc 能让你快速"时光倒流"。

快捷键详解

```sh
按一次 Esc     → 清除当前正在输入的内容（类似 Ctrl+C）
按两次 Esc     → 回退到上一次对话状态（撤销上一轮对话）
按三次 Esc     → 清除所有对话历史（重新开始）

# 注意：可以为正在会话中的 Claude Code 补充一些边界、一些会话中未给的说明等。
```

技巧 2：**@ 引用文件 —— 精准指定上下文**
> Claude Code 虽然能自动读取项目文件，但显式地引用文件能让 AI 更准确地理解你的意图，也能避免 AI 读取不相关的文件浪费 Token。

高级用法
```sh
# 多文件对比分析
@src/app.tsx @src/components/Header.tsx 这两个文件的关系是什么？

# 引用目录
@src/components/ 总结一下这个目录下的所有组件

# 引用特定行（配合代码编辑器）
@src/utils.ts:45-60 解释这段代码的作用
```

技巧 3：**/plan 先规划后编码 —— 复杂任务的正确打开方式**
> 对于复杂的开发任务，直接开始编码往往效率低下。`/plan` 命令让 Claude 进入规划模式，先制定详细的实施计划，再一步步执行。

1️⃣ Prompt 提示词
```bash
/plan
我想添加用户认证功能，请帮我制定实施计划

# Claude 会做什么
  # 分析需求：理解你要实现的功能
  # 评估现状：查看当前项目结构和技术栈
  # 制定计划：分步骤列出需要做的事情
  # 确认方案：与你讨论计划，根据反馈调整
```

2️⃣ 最佳实战
> - 对于`任务时常较长`的的任务，推荐先用 `/plan`
> - 计划制定后，可以逐阶段执行，每完成一个阶段检查一次
> - 如果需求变更，可以重新运行 `/plan` 调整计划

技巧 4：**/init 自动生成配置 —— 快速初始化项目**
> `/init` 是 Claude Code 最强大的命令之一。它能自动扫描你的项目，理解技术栈和结构，然后生成一份完整的 `CLAUDE.md` 配置文件。

```sh
/init # 注意指定目录，CLAUDE.md 文件一般都在 .claude 目录下
```
Claude 会执行以下步骤
  - **扫描项目结构**：识别框架、语言、构建工具
  - **分析配置文件**：读取 `package.json`、`tsconfig.json` 等
  - **检查代码风格**：了解命名规范、文件组织方式
  - **生成 CLAUDE.md**：创建包含项目信息的配置文件
> `建议`：新项目初始化后，立即运行 `/init`，然后根据实际情况调整生成的配置。

技巧 5：**/compact 压缩上下文 —— 节省 Token**
> Claude Code 的上下文窗口是有限的（通常 200K Token）。长对话会消耗大量 Token，不仅增加成本，还可能导致重要的早期信息被挤出上下文窗口。

```sh
/compact
```

1️⃣ 工作原理
> `/compact` 会分析当前对话历史，提取关键信息（如已做出的决策、已生成的代码、已确认的需求），然后生成一份简洁的摘要。之后的对话基于这份摘要，而不是完整的历史记录。

技巧 6：**用 Claude Code 辅助 Git 提交**
> 在 Claude Code 里，推荐的提交流程是：先让 Claude 帮你查看 diff、整理提交信息，再由你执行标准的 Git 命令完成提交。这样既清晰，也方便你在提交前再次确认改动内容。

1️⃣ 推荐工作流

```sh
# 1. 查看当前改动
/diff
!git status

# 2. 让 Claude 总结变更并生成提交信息
请基于当前 git diff，按照 Conventional Commits 规范生成一个 commit message，
并用中文解释为什么这样分类

# 3. 你确认后，再执行标准 Git 提交
!git add -A
!git commit -m "feat(docs): update Claude Code workflow guidance"
```

技巧 7：**Shift+Tab 自动接受 —— 提高流畅度**
> 默认情况下，Claude 修改代码前会询问你的确认。这在学习阶段很有帮助，但熟悉后可能会觉得繁琐。`Shift+Tab` 开启`自动接受模式`，让工作流更流畅。

1️⃣ 使用方式
- 按 `Shift+Tab` → 进入自动接受模式
- 再按 `Shift+Tab` → 退出自动接受模式

2️⃣ 模式对比

| 模式     | 行为               | 适用场景           |
| -------- | ------------------ | ------------------ |
| 默认模式 | 每次修改都询问确认 | 学习阶段、重要代码 |
| 自动接受 | 直接应用修改       | 熟悉后、快速迭代   |

⚠️ 注意事项
- 自动接受模式下，Claude 会直接修改文件，没有二次确认
- 建议配合 Git 使用，这样即使出问题也能回滚
- 对于敏感操作（如删除文件、修改配置），Claude 仍会询问

技巧 8：**Ctrl+C 取消操作 —— 紧急制动**
> 当 Claude 正在执行一个长时间运行的任务，或者你意识到给错了指令时，`Ctrl+C` 是你的"紧急制动"按钮。

1️⃣ 使用方式

- 按一次 `Ctrl+C` → 取消当前正在执行的操作
- 按两次 `Ctrl+C` → 完全退出 Claude Code


2️⃣ 使用场景

- Claude 正在运行一个耗时的命令，你想中断
- Claude 开始生成大量不相关的代码
- 你意识到给错了指令，想立即停止

3️⃣ 与双击 Esc 的区别

- `Ctrl+C`：停止正在进行的操作（如运行命令、生成代码）
- `双击 Esc`：回退对话状态（撤销上一轮对话）


技巧 9：**/context 查看上下文使用 —— 优化 Token 消耗**
> `/context` 显示当前会话的上下文使用情况，帮助你了解 Token 消耗，优化使用成本。

```sh
/context
```

技巧 10：**/resume 恢复会话 —— 切换多任务对话**
> 当你在处理多个任务时，可能会开启多段对话。`/resume` 能让你在当前聊天中快速切换回之前的会话，而不需要退出重新启动。

```sh
/resume
```

工作原理
> Claude Code 会自动记录你之前的对话会话。当你使用 `/resume`时，它会切换回上一段会话的上下文，保留之前的所有讨论内容和状态。

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
