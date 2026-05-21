---
name: astro-blog-init
description: 使用 Astro Web 框架搭建博客项目。当用户需要创建 Astro 博客、初始化 Astro 项目、搭建个人博客网站时使用。覆盖项目初始化、目录结构、页面路由、组件与布局、内容集合、Markdown 文章、RSS 订阅、样式系统、构建部署全流程。
---

# Astro 博客项目搭建

使用 Astro 框架从零搭建一个功能完整的博客项目，涵盖项目初始化、页面路由、组件开发、布局系统、内容集合、Markdown 文章管理、RSS 订阅、样式处理、群岛架构及构建部署。

## 工作流程

### 1. 环境准备与项目初始化

#### 前提条件

- Node.js v22.12.0 或更高版本（奇数版本不受支持）
- 推荐使用 VS Code + 官方 Astro 扩展

#### 创建项目（推荐 CLI 向导）

```bash
pnpm create astro@latest
```

向导交互配置：

- 项目名称：用户自定义（如 `my-blog`）
- 模板选择：推荐 **"Empty"（空白）** 或 **"Blog"（博客模板）**
- 依赖安装：选择 Yes
- TypeScript：推荐 Yes（使用 `strict` 模式）
- Git 初始化：推荐 Yes

创建完成后进入项目目录：

```bash
cd my-blog
pnpm run dev
```

开发服务器默认运行在 `http://localhost:4321`。

#### 备选：模板安装

```bash
pnpm create astro@latest -- --template minimal
pnpm create astro@latest -- --template blog
```

#### 核心脚本

`package.json` 中必须包含以下脚本：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

### 2. 博客项目标准目录结构

```
learn-skill/
├── public/                  # 静态资源，原样复制到构建产物
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── content/             # 内容集合 — 博客文章存放处（推荐）
│   │   ├── blog/            # blog 内容集合
│   │   │   ├── post-1.md
│   │   │   └── post-2.md
│   │   └── config.ts        # 内容集合 schema 定义
│   ├── components/          # 可复用组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Nav.astro
│   │   └── BlogCard.astro
│   ├── layouts/             # 布局组件 — 页面外壳
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/               # 【必需】路由页面
│   │   ├── index.astro      # 首页
│   │   ├── about.astro      # 关于页
│   │   ├── blog/            # 博客相关页面
│   │   │   ├── index.astro  # 文章列表页
│   │   │   └── [slug].astro # 文章详情页（动态路由）
│   │   ├── tags/
│   │   │   ├── index.astro  # 标签索引页
│   │   │   └── [tag].astro  # 标签筛选页（动态路由）
│   │   └── rss.xml.js       # RSS 订阅端点
│   └── styles/              # 全局样式
│       └── global.css
├── astro.config.mjs         # Astro 配置文件
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目清单
```

#### 目录说明

| 目录/文件          | 必需   | 说明                                 |
| ------------------ | ------ | ------------------------------------ |
| `src/pages/`       | **是** | 唯一必需目录，文件路由自动映射为 URL |
| `src/components/`  | 否     | 可复用 UI 组件                       |
| `src/layouts/`     | 否     | 页面外壳，通过 `<slot />` 插入内容   |
| `src/content/`     | 否     | 内容集合，用于管理 Markdown 文章     |
| `src/styles/`      | 否     | 全局 CSS 样式                        |
| `public/`          | 否     | 静态资源，不做构建处理               |
| `astro.config.mjs` | 否     | 集成与构建配置                       |
| `tsconfig.json`    | 否     | TypeScript 配置                      |

### 3. 页面与路由

#### 基于文件的路由

`src/pages/` 下的文件结构直接映射为网站 URL：

| 文件路径                      | 对应 URL                  |
| ----------------------------- | ------------------------- |
| `src/pages/index.astro`       | `/`                       |
| `src/pages/about.astro`       | `/about`                  |
| `src/pages/blog/index.astro`  | `/blog`                   |
| `src/pages/blog/[slug].astro` | `/blog/:slug`（动态路由） |
| `src/pages/tags/[tag].astro`  | `/tags/:tag`（动态路由）  |

#### .astro 页面结构

每个 `.astro` 文件包含两部分：

```astro
---
// Frontmatter（脚本区）— 在服务端/构建时执行
const pageTitle = '关于我';
import BaseLayout from '../layouts/BaseLayout.astro';
---

<!-- HTML 模板区 — 输出 HTML -->
<BaseLayout pageTitle={pageTitle}>
  <h1>关于我</h1>
  <p>这是关于页面。</p>
</BaseLayout>
```

#### Markdown 页面

Astro 原生支持将 `src/pages/` 下的 `.md` 文件自动渲染为 HTML 页面，并且能识别 frontmatter：

```md
---
title: "我的第一篇博客"
date: 2025-01-15
---

# 我的第一篇博客

这是文章内容...
```

### 4. 布局系统

#### 基础布局组件

```astro
---
// src/layouts/BaseLayout.astro
export interface Props {
  pageTitle: string;
  description?: string;
}

const { pageTitle, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description || pageTitle} />
  <title>{pageTitle}</title>
  <link rel="stylesheet" href="/src/styles/global.css" />
</head>
<body>
  <header>
    <nav><!-- 导航栏 --></nav>
  </header>
  <main>
    <slot />  <!-- 页面内容插入点 -->
  </main>
  <footer>
    <p>&copy; {new Date().getFullYear()} My Blog</p>
  </footer>
</body>
</html>
```

#### 布局嵌套

支持多层布局嵌套，如 `BaseLayout` > `BlogPostLayout`：

```astro
---
// src/layouts/BlogPostLayout.astro
import BaseLayout from './BaseLayout.astro';
export interface Props {
  title: string;
  date: Date;
  tags?: string[];
}
const { title, date, tags } = Astro.props;
---
<BaseLayout pageTitle={title}>
  <article>
    <h1>{title}</h1>
    <time datetime={date.toISOString()}>{date.toLocaleDateString('zh-CN')}</time>
    <slot />  <!-- 文章内容插入点 -->
  </article>
</BaseLayout>
```

### 5. 内容集合（推荐方式管理博客文章）

#### 定义 Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

#### 编写文章

文章存放在 `src/content/blog/` 目录下：

```md
---
title: "使用 Astro 搭建博客"
date: 2025-05-21
description: "记录使用 Astro 框架搭建个人博客的过程。"
tags: ["Astro", "博客", "前端"]
---

## 为什么选择 Astro

Astro 是一个现代化的静态站点生成器...
```

#### 查询内容集合

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
// 按日期倒序排列
posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<BaseLayout pageTitle="博客">
  <ul>
    {posts.map((post) => (
      <li>
        <a href={`/blog/${post.slug}`}>
          {post.data.title}
        </a>
        <time datetime={post.data.date.toISOString()}>
          {post.data.date.toLocaleDateString('zh-CN')}
        </time>
      </li>
    ))}
  </ul>
</BaseLayout>
```

#### 动态路由文章详情页

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogPostLayout
  title={post.data.title}
  date={post.data.date}
  tags={post.data.tags}
>
  <Content />
</BlogPostLayout>
```

### 6. 标签系统

#### 标签索引页

```astro
---
// src/pages/tags/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = await getCollection('blog');
const allTags = [...new Set(posts.flatMap((p) => p.data.tags))];
---

<BaseLayout pageTitle="标签">
  <ul>
    {allTags.map((tag) => (
      <li><a href={`/tags/${tag}`}>{tag}</a></li>
    ))}
  </ul>
</BaseLayout>
```

#### 标签筛选动态路由

```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return tags.map((tag) => ({ params: { tag } }));
}

const { tag } = Astro.params;
const posts = await getCollection('blog', ({ data }) =>
  data.tags.includes(tag)
);
---

<BaseLayout pageTitle={`标签: ${tag}`}>
  <ul>
    {posts.map((post) => (
      <li><a href={`/blog/${post.slug}`}>{post.data.title}</a></li>
    ))}
  </ul>
</BaseLayout>
```

### 7. RSS 订阅

```javascript
// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "我的博客",
    description: "一个 Astro 博客",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
```

### 8. 样式系统

#### 组件级 Scoped CSS

```astro
<style>
  /* 此样式仅作用于当前组件 */
  h1 {
    color: #333;
  }
</style>
```

#### 全局样式

```css
/* src/styles/global.css */
:root {
  --color-primary: #2563eb;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --font-sans: system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

#### 全局样式引入方式

在 `BaseLayout.astro` 的 head 中引入：

```astro
<link rel="stylesheet" href="/src/styles/global.css" />
```

或在 `.astro` 文件的 frontmatter 中导入：

```astro
---
import '../styles/global.css';
---
```

### 9. 组件开发

#### 可复用组件示例

```astro
---
// src/components/BlogCard.astro
export interface Props {
  title: string;
  date: Date;
  slug: string;
  description?: string;
}
const { title, date, slug, description } = Astro.props;
---

<article class="blog-card">
  <h2><a href={`/blog/${slug}`}>{title}</a></h2>
  <time datetime={date.toISOString()}>
    {date.toLocaleDateString('zh-CN')}
  </time>
  {description && <p>{description}</p>}
</article>
```

#### 客户端交互组件（群岛架构）

使用 `client:*` 指令控制组件水合时机：

```astro
---
import ThemeToggle from '../components/ThemeToggle';
---
<!-- client:load — 页面加载时立即水合 -->
<ThemeToggle client:load />

<!-- client:idle — 浏览器空闲时水合 -->
<SearchBar client:idle />

<!-- client:visible — 组件进入视口时水合 -->
<BackToTop client:visible />

<!-- client:media — 匹配媒体查询时水合 -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- client:only — 仅在客户端渲染，跳过服务端 -->
<Analytics client:only="react" />
```

### 10. 配置文件

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://example.com",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
```

### 11. 构建与部署

#### 本地开发

```bash
pnpm run dev           # 启动开发服务器
pnpm run build         # 构建生产版本（输出到 dist/）
pnpm run preview       # 本地预览构建产物
```

#### 部署到 Netlify / Vercel

1. 将代码推送到 GitHub 仓库
2. 在托管平台连接仓库
3. 构建命令：`pnpm run build`
4. 发布目录：`dist/`

### 12. 常用集成

```bash
# RSS 订阅
npx astro add @astrojs/rss

# 站点地图
npx astro add sitemap

# 支持 React 组件
npx astro add react

# 支持 Vue 组件
npx astro add vue

# Tailwind CSS
npx astro add tailwind

# 支持 MDX
npx astro add mdx
```

## 关键技术决策

### 内容管理方式选择

| 方式                    | 适用场景                     |
| ----------------------- | ---------------------------- |
| `src/pages/*.md`        | 简单博客，文章数量少         |
| `src/content/` 内容集合 | 推荐，类型安全 + schema 校验 |
| CMS（如 TinaCMS）       | 需要非技术人员编辑内容       |

### 文章参数化路由 vs 内容集合路由

- **传统方式**：文章放在 `src/pages/blog/`，使用 `Astro.glob()` 查询
- **推荐方式**：文章放在 `src/content/blog/`，使用 `getCollection()` 查询，获得类型安全和更好的 DX

## 强制遵守规则

- `src/pages/` 目录必须存在，这是唯一强制的目录约定
- 所有依赖必须放在 `dependencies` 中（Astro 推荐，非 `devDependencies`）
- 构建产物输出到 `dist/`，此目录不应提交到 Git
- `.astro` 文件的 frontmatter 分隔符必须使用 `---`（三个短横线）
- 动态路由文件命名必须使用 `[param].astro` 格式
- 内容集合的 schema 必须使用 Zod 定义在 `src/content/config.ts`
- 静态资源（favicon、robots.txt 等）放在 `public/`，不会被构建处理
- 页面样式优先使用 scoped `<style>` 标签，全局样式放在 `src/styles/`
- 客户端交互必须使用 `client:*` 指令，默认情况下 Astro 不输出 JavaScript
- 包管理工具必须使用 `pnpm`，同时 `pnpm` 版本必须在 v8.0.0 以上的稳定版本
- 页面文件必须以 `.astro` 或 `.md` 结尾，其他扩展名不受支持
- 项目中不能出现敏感信息，如 API 密钥、数据库连接字符串、用户名等，必须使用环境变量管理

## 检查清单

- [ ] 使用 `pnpm create astro@latest` 创建项目，选择空白模板
- [ ] 确认 `src/pages/` 目录存在，包含 `index.astro`
- [ ] 创建 `src/layouts/BaseLayout.astro` 作为全局布局
- [ ] 创建 `src/components/` 存放 Header、Footer、Nav 等组件
- [ ] 创建 `src/content/config.ts` 定义博客内容集合 schema
- [ ] 将博客文章放在 `src/content/blog/` 目录下
- [ ] 文章 frontmatter 包含 title、date、description、tags 等字段
- [ ] 创建 `src/pages/blog/index.astro` 文章列表页
- [ ] 创建 `src/pages/blog/[slug].astro` 文章详情动态路由
- [ ] 创建 `src/pages/tags/index.astro` 和 `src/pages/tags/[tag].astro`
- [ ] 创建 `src/pages/rss.xml.js` RSS 订阅端点
- [ ] 配置 `astro.config.mjs`，设置 `site` 属性
- [ ] 配置 `tsconfig.json`（如使用 TypeScript）
- [ ] `pnpm run dev` 正常启动开发服务器
- [ ] `pnpm run build` 构建成功，产物输出到 `dist/`
- [ ] 所有页面在浏览器中正常显示
- [ ] 标签筛选和动态路由正常工作
- [ ] RSS 订阅源可正常访问
- [ ] 代码推送到 GitHub 并连接部署平台

## 参考资料

- [Astro 官方安装指南](https://docs.astro.build/zh-cn/install-and-setup/)
- [Astro 项目结构](https://docs.astro.build/zh-cn/basics/project-structure/)
- [Astro 开发与构建](https://docs.astro.build/zh-cn/develop-and-build/)
- [Astro 官方博客教程](https://docs.astro.build/zh-cn/tutorial/0-introduction/)
- [Astro 内容集合指南](https://docs.astro.build/zh-cn/guides/content-collections/)
- [Astro 群岛架构](https://docs.astro.build/zh-cn/concepts/islands/)
