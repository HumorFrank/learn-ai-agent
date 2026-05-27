---
title: '使用 Astro 搭建个人博客'
date: 2025-05-20
description: '记录使用 Astro 框架从零搭建个人博客的过程，涵盖项目初始化、内容集合、动态路由等核心功能。'
tags: ['Astro', '博客', '前端']
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
        <span class="sg-tag">Astro 框架</span>
        <span class="sg-tag">群岛架构</span>
        <span class="sg-tag">内容集合</span>
        <span class="sg-tag">静态站点</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">⏱️</div>
        <div class="sg-item-label">预计阅读</div>
      </div>
      <div class="sg-time">
        <span class="sg-time-num">8</span>
        <span class="sg-time-unit">min</span>
      </div>
    </div>
    <div class="sg-item">
      <div class="sg-item-head">
        <div class="sg-item-icon">📦</div>
        <div class="sg-item-label">你将收获</div>
      </div>
      <ul class="sg-list">
        <li>理解群岛架构设计理念</li>
        <li>从零搭建 Astro 博客</li>
        <li>掌握内容集合与动态路由</li>
      </ul>
    </div>
  </div>
</div>

## 为什么选择 Astro

Astro 是一个现代化的静态站点生成器，它的核心理念是 **"群岛架构"（Islands Architecture）**——默认情况下页面上不包含任何 JavaScript，只在需要交互的地方注入必要的 JS。

这意味着你的博客在首次加载时几乎是零 JavaScript 的纯静态 HTML，速度极快。

## 主要特性

- **基于文件的路由**：`src/pages/` 下的文件自动映射为 URL
- **内容集合**：使用 Zod schema 定义 frontmatter 类型，获得完整的类型安全
- **支持多框架**：可以在同一个项目中使用 React、Vue、Svelte 等组件
- **Markdown 原生支持**：`.md` 文件可以直接作为页面渲染

## 项目结构

```bash
my-blog/
├── src/
│   ├── content/blog/   # 博客文章
│   ├── components/     # 可复用组件
│   ├── layouts/        # 布局组件
│   └── pages/          # 路由页面
├── public/             # 静态资源
└── astro.config.mjs    # 配置文件
```

## 总结

Astro 非常适合搭建内容型网站，特别是博客、文档站这类以静态内容为主的场景。它的学习曲线平缓，文档完善，推荐给需要快速搭建个人博客的开发者。
