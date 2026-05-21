# LearnSkill

个人技术博客，记录 Skill 学习过程中的思考与实践。

基于 [Astro](https://astro.build) 构建，采用静态生成，追求极致的加载速度和纯净的阅读体验。

## 技术栈

- **框架**：[Astro](https://astro.build) v6
- **内容**：Markdown 内容集合（Content Collections）
- **样式**：纯 CSS（CSS Variables + Fraunces 字体 + 暖色调 Editorial 风格）
- **代码高亮**：[Shiki](https://shiki.style)（github-dark 主题）
- **RSS**：[@astrojs/rss](https://docs.astro.build/zh-cn/guides/rss/)
- **站点地图**：[@astrojs/sitemap](https://docs.astro.build/zh-cn/guides/integrations-guide/sitemap/)
- **部署**：静态文件，兼容 Netlify / Vercel / GitHub Pages

## 目录结构

```
LearnSkill/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── BlogCard.astro          # 文章卡片组件
│   ├── content/
│   │   └── blog/                    # 博客文章（Markdown）
│   ├── layouts/
│   │   ├── BaseLayout.astro        # 基础布局（导航、页脚）
│   │   └── BlogPostLayout.astro    # 文章详情布局
│   ├── pages/
│   │   ├── index.astro             # 首页
│   │   ├── about.astro             # 关于页
│   │   ├── rss.xml.js              # RSS 订阅源
│   │   ├── blog/
│   │   │   ├── index.astro         # 文章列表
│   │   │   └── [slug].astro        # 文章详情动态路由
│   │   └── tags/
│   │       ├── index.astro         # 标签列表
│   │       └── [tag].astro         # 按标签筛选文章
│   ├── styles/
│   │   └── global.css              # 全局样式与设计变量
│   └── content.config.ts           # 内容集合 Schema 定义
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 添加新文章

在 `src/content/blog/` 目录下创建 `.md` 文件，添加 YAML frontmatter：

```md
---
title: '文章标题'
date: 2026-01-01
description: '文章摘要，显示在卡片中。'
tags: ['标签1', '标签2']
draft: false   # true 时仅开发环境可见
---

文章正文内容...
```

保存后 Astro 会自动识别并生成页面，无需修改任何代码。

## 设计特点

- **暖色调 Editorial 风格** — 奶油底色搭配赤陶色点缀，Fraunces 衬线标题字体
- **毛玻璃导航栏** — `backdrop-filter` 模糊效果，随页面滚动固定
- **阅读进度条** — 页面顶部渐变进度指示
- **卡片悬浮动效** — 文章卡片 hover 时的抬升与箭头滑入
- **交错入场动画** — 文章列表依次淡入，提升视觉层次
- **标签云** — 带文章计数的卡片式标签展示
- **RSS 订阅** — 自动生成 RSS 源，支持阅读器订阅

## 部署

项目输出纯静态文件（`dist/`），可部署到任意静态托管平台：

```bash
pnpm build
# 将 dist/ 目录部署到目标平台
```

## License

MIT

