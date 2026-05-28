# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 常用命令

```bash
pnpm dev              # 启动开发服务器（端口 4321）
pnpm build            # 生产构建到 dist/
pnpm preview          # 预览生产构建
```

包管理器为 **pnpm v10**（在 `package.json` 中强制指定）。未配置测试运行器。

## 项目概述

一个关于 AI Agent 学习的个人技术博客，使用 **Astro v6**（静态 SSG）构建，部署到 GitHub Pages：`humorfrank.github.io/learn-ai-agent/`。

核心依赖：`astro`、`@astrojs/rss`、`@astrojs/sitemap`。

## 项目架构

### 布局层级

```text
BaseLayout.astro          ← HTML 骨架：<head>、导航栏、主题脚本、页脚、视图过渡
  └─ BlogPostLayout.astro ← 继承上述：文章头部、正文、文末
       └─ [slug].astro    ← 通过 getStaticPaths + render() 获取单篇博客
```

`BaseLayout` 导入 `global.css`，所有主题和设计令牌在全局可用。

### 内容层

`src/content.config.ts` 使用 Astro v6 的 **Content Layer API** 配合 `glob` 加载器。

Schema 字段：

- `title`（string）— 必填
- `date`（coerce date）— 必填
- `description`（string）— 可选
- `tags`（string[]）— 默认 `[]`
- `draft`（bool）— 默认 `false`

博客文章存放在 `src/content/blog/*.md`。`[slug].astro` 页面通过 `getStaticPaths()` + `render()` 生成静态页面。

### 草稿文章

`index.astro` 和 `blog/index.astro` 仅在正式环境（`import.meta.env.PROD`）下过滤 `draft: true` 的文章。开发时草稿可见。

### 主题系统

通过 `<html>` 上的 `data-theme` 属性控制暗色/亮色模式。

关键实现细节：

- **防闪烁**：`BaseLayout.astro` 中的内联 `<script is:inline>` 在首帧渲染前从 `localStorage` 读取并设置属性
- **切换组件**：`ThemeToggle.astro` 使用原生 JS 事件监听器处理切换
- **Token 层级**：暗色主题变量在 `:root`，亮色主题覆盖在 `[data-theme="light"]`
- **强调色**：暗色模式绿色（`#04d9a0`），亮色模式靛蓝色（`#4f46e5`）

### 基础路径处理

站点部署于 GitHub Pages 子路径 `/learn-ai-agent/`。所有内部链接通过 `import.meta.env.BASE_URL.replace(/\/$/, '')` 计算基础路径 — `BaseLayout.astro` 和 `BlogCard.astro` 中均采用此方式。开发时 `BASE_URL` 为 `/`，正式环境（`astro.config.mjs` 配置）为 `/learn-ai-agent/`。

### 设计系统

`src/styles/global.css` 定义完整的 CSS 自定义属性体系（颜色、阴影、圆角、缓动函数）。主要视觉特性：

- 颗粒纹理覆盖层（`body::before` SVG 噪声，极低透明度）
- 玻璃拟态引用块（`backdrop-filter: blur(20px)`）
- 交错入场动画（`.stagger` + `nth-child` 延迟）
- 阅读进度条（渐变色，固定视口顶部，`BaseLayout.astro` 中滚动监听器驱动）
- 章节导读卡片（`.sg-card` — 见下文）

### 章节导读卡片

每篇 `.md` 博客文章顶部有一段原始 HTML 的 `.sg-card` 块，包含学习目标、预计阅读时间和收获要点。这是项目约定，直接在 Markdown 中以 HTML 形式编写，非 Astro 组件。

## CI/CD

`.github/workflows/deploy.yml` 在推送到 `main` 分支时触发：

```text
检出 → 配置 pnpm + Node 22 → pnpm install --frozen-lockfile → pnpm build → 部署到 GitHub Pages
```

## Skills

项目专属技能位于 `.claude/skills/`：

- `astro-blog-init` — 初始化 Astro 博客项目
- `auto-extract-doc` — 提取和分类 Markdown 文档
- `deploy-github-actions` — 配置 GitHub Actions 部署
- `markdown-format` — 按 markdown.com.cn 标准格式化 Markdown
- `security-scan` — 扫描敏感信息和安全风险
- `skill-creator` — 创建和修改 Agent 技能

已安装的第三方技能（记录在 `skills-lock.json`）：`frontend-design`、`skill-creator`（来自 `anthropics/skills`）。
