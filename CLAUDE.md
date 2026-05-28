# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 常用命令

```bash
pnpm dev              # 启动开发服务器 (端口 4321)
pnpm build            # 生产构建到 dist/
pnpm preview          # 预览生产构建
```

包管理器为 **pnpm v10**（在 package.json 中强制指定）。未配置测试运行器。

## 项目架构

这是一个关于 AI Agent 学习的个人技术博客，使用 **Astro v6**（静态 SSG）构建，部署到 GitHub Pages：`humorfrank.github.io/learn-ai-agent/`。

### 布局层级

```
BaseLayout.astro          ← HTML 骨架: <head>、导航栏、主题脚本、页脚、视图过渡
  └─ BlogPostLayout.astro ← 继承上述: 文章头部（返回链接、标题、日期、标签）、文章正文、文末
       └─ [slug].astro    ← 通过 getStaticPaths + render() 获取单篇博客文章
```

`BaseLayout` 导入了 `global.css`，因此所有主题和设计令牌在全局可用。

### 内容层（Astro v6）

在 `src/content.config.ts` 中定义 — 使用 **Content Layer API** 配合 `glob` 加载器（非旧版 `type: "content"`）。Schema：`title`（字符串）、`date`（日期强制转换）、`description`（可选字符串）、`tags`（字符串数组，默认 []）、`draft`（布尔值，默认 false）。

博客文章位于 `src/content/blog/*.md`。`[slug].astro` 页面使用 `getStaticPaths()` + `astro:content` 的 `render()` 来生成静态页面。

### 草稿文章

`index.astro` 和 `blog/index.astro` 仅在正式环境（`import.meta.env.PROD`）下过滤掉 `draft: true` 的文章。草稿文章在 `pnpm dev` 时可见。

### 主题系统（暗色/亮色）

- 通过 `<html>` 上的 `data-theme` 属性控制。
- 防闪烁：`BaseLayout.astro` 中的内联 `<script is:inline>` 在首帧渲染前读取 `localStorage` 设置属性。
- `ThemeToggle.astro` 组件使用原生 JS 事件监听器处理切换按钮。
- 暗色主题的 CSS 自定义属性在 `:root` 上；亮色主题的覆盖在 `[data-theme="light"]` 上。
- 强调色：暗色模式下为绿色（`#04d9a0`），亮色模式下为靛蓝色（`#4f46e5`）。

### 基础路径处理

站点部署到 GitHub Pages 子路径（`/learn-ai-agent/`）。所有内部链接通过 `import.meta.env.BASE_URL.replace(/\/$/, '')` 计算基础路径 — `BaseLayout.astro` 和 `BlogCard.astro` 中均采用此方式。开发时 `BASE_URL` 为 `/`；正式环境（在 `astro.config.mjs` 中配置）为 `/learn-ai-agent/`。

### 设计系统（`src/styles/global.css`）

CSS 自定义属性用于颜色、阴影、圆角和缓动函数。主要特性：
- 颗粒纹理覆盖层（`body::before`），使用 SVG 噪声，极低透明度。
- 玻璃拟态（Glassmorphism）引用块，使用 `backdrop-filter: blur(20px)`。
- 通过 `.stagger` 类和 `nth-child` 动画延迟实现的交错入场动画。
- 阅读进度条（渐变色，固定在视口顶部，由 `BaseLayout.astro` 中的滚动监听器驱动）。
- 章节导读卡片（`.sg-card`）— 自定义卡片模式，用于每篇博客文章顶部的学习目标、阅读时间和收获。

### 章节导读卡片约定

每篇 `.md` 博客文章以原始 HTML `.sg-card` 块开头，包含学习目标、预计阅读时间和收获。这是项目级别的约定，而非 Astro 组件 — 直接在 Markdown 中以 HTML 形式编写。

### CI/CD

`.github/workflows/deploy.yml` 在推送到 `main` 分支时触发：检出 → 配置 pnpm + Node 22 → `pnpm install --frozen-lockfile` → `pnpm build` → 通过 `actions/deploy-pages@v4` 部署到 GitHub Pages。

### Skills（技能）

项目专属技能位于 `.claude/skills/`：
- `astro-blog-init` — 初始化 Astro 博客项目。
- `auto-extract-doc` — 提取和分类 Markdown 文档。
- `deploy-github-actions` — 为 Astro 配置 GitHub Actions 部署。
- `markdown-format` — 按 markdown.com.cn 标准格式化 Markdown 文件。
- `security-scan` — 扫描敏感信息和安全风险。
- `skill-creator` — 创建和修改 Agent 技能。

已安装的第三方技能（记录在 `skills-lock.json` 中）：`frontend-design`、`skill-creator`（来自 `anthropics/skills`）。
