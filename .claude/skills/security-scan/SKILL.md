---
name: security-scan
description: 扫描项目中的敏感信息泄露和安全风险。当用户提及安全检测、敏感信息、密钥泄露、凭证扫描、漏洞扫描、安全审计，或想在推送代码/创建 PR 前确认没有暴露密钥/密码/令牌/API Key 时使用此技能。也可用于推送前的安全自检。
---

# 安全与敏感信息扫描

在推送或部署前，检测项目中的敏感信息泄露。

## 扫描类别

依次执行以下八个类别的扫描。每个类别有具体的搜索模式和需要检查的文件。

### 1. 硬编码 API Key / Token

在所有已跟踪文件中搜索常见密钥模式：

- `password=`, `passwd=`, `pwd=`, `secret_key=`, `secret=` with actual values (not variable names)
- `api_key=`, `apikey=`, `api-key=`, `API_KEY=` with values
- `token=`, `access_token=`, `auth_token=` with values
- `Bearer `, `Authorization:` headers with real tokens
- AWS keys: `AKIA` (20-char prefix), `ASIA`
- GitHub PATs: `ghp_`, `github_pat_`, `gho_`, `ghu_`, `ghs_`, `ghr_`
- GitLab PATs: `glpat-`
- npm tokens: `npm_`
- Slack tokens: `xoxb-`, `xoxp-`, `xoxa-`, `xoxk-`
- Stripe keys: `sk_live_`, `pk_live_`, `rk_live_`
- OpenAI/Anthropic keys: `sk-` followed by 20+ chars (exclude placeholder text like "sk-你的API Key")
- JWT patterns: `eyJ` (base64-encoded JWT header)
- Private keys: `-----BEGIN RSA PRIVATE KEY-----`, `-----BEGIN PRIVATE KEY-----`, `-----BEGIN EC PRIVATE KEY-----`

使用 Grep 搜索以上所有模式。过滤已知误报：包含中文占位文本如"你的"的字符串、模板变量如 `${{ secrets.* }}`、示例/教程值。

### 2. 密码 / 私钥 / 证书

- 通过 Glob 搜索 `.pem`、`.key`、`.cert`、`.p12`、`.pfx`、`.jks` 文件
- 在所有文件中 Grep `-----BEGIN`（捕获嵌入的私钥）
- 检查项目根目录是否存在 `.ssh/` 目录

### 3. 云服务凭证 (AWS 等)

- 搜索 `AWS_ACCESS_KEY_ID`、`AWS_SECRET_ACCESS_KEY`、`AWS_SESSION_TOKEN` 及其真实值
- Grep `AKIA`、`ASIA`（AWS 密钥前缀）
- 搜索 `.aws/credentials` 或 `.aws/config` 文件
- 检查 GCP 服务账号 JSON 文件：在 JSON 文件中搜索 `"type": "service_account"`
- 搜索 Azure 连接字符串模式

### 4. .env 文件

- Glob 搜索 `.env`、`.env.local`、`.env.production`、`.env.staging`、`.env.*.local`
- 如果找到，读取内容并检查是否包含真实凭证
- `.env.example` 文件可以接受 — 但应只包含占位值，需验证

### 5. Git 历史中的敏感文件

- 运行 `git log --all --diff-filter=A --name-only --pretty=format:` 并在输出中搜索 `.env`、`.pem`、`.key`、`.npmrc`、`.netrc`、`.gitconfig`、`credentials`、`id_rsa`
- 检查是否有敏感文件曾被提交后又删除（仍存在于历史记录中）

### 6. pnpm-lock.yaml 中的 auth token

- 读取 `pnpm-lock.yaml`（或对应的锁文件）并搜索 `_authToken`、`_auth`、`authtoken`
- 嵌入在锁文件中的私有仓库令牌是常见的泄露途径

### 7. .gitignore 覆盖率

- 读取 `.gitignore`，验证是否排除了：`.env`、`.env.*`、`.env.local`、`*.pem`、`*.key`、`*.cert`、`.npmrc`、`.netrc`、`.aws/`、`dist/`、`node_modules/`
- 报告缺失的关键规则

### 8. CI/CD 密钥引用

- 读取 `.github/workflows/` 下的所有工作流文件
- 验证密钥仅通过 `${{ secrets.* }}` 语法引用，从未硬编码
- 检查 `id-token: write` 权限（OIDC 场景合法）是否存在过度授权

## 报告格式

使用以下精确格式输出扫描结果汇总表：

```
项目安全扫描结果：

  ┌────────────────────────────────┬────────────────────────────┐
  │              类别               │            状态            │
  ├────────────────────────────────┼────────────────────────────┤
  │ 硬编码 API Key / Token          │ 通过 / 发现泄露            │
  ├────────────────────────────────┼────────────────────────────┤
  │ 密码 / 私钥 / 证书              │ 通过 / 发现泄露            │
  ├────────────────────────────────┼────────────────────────────┤
  │ 云服务凭证 (AWS等)              │ 通过 / 发现泄露            │
  ├────────────────────────────────┼────────────────────────────┤
  │ .env 文件                       │ 不存在 / 存在并安全 / 泄露 │
  ├────────────────────────────────┼────────────────────────────┤
  │ Git 历史中的敏感文件            │ 通过 / 发现泄露            │
  ├────────────────────────────────┼────────────────────────────┤
  │ pnpm-lock.yaml 中的 auth token │ 通过 / 发现泄露            │
  ├────────────────────────────────┼────────────────────────────┤
  │ .gitignore 覆盖率              │ 正常 / 缺少关键规则        │
  ├────────────────────────────────┼────────────────────────────┤
  │ CI/CD 密钥引用                  │ 仅使用 GitHub Secrets / 硬编码泄露 │
  └────────────────────────────────┴────────────────────────────┘
```

如果某个类别发现真实问题，在表格下方列出文件路径、行号和具体发现。对于误报风险（如文档中的模板占位符），单独标注为"低风险提示"。

通过检查的类别，在表格中标记"通过"即可，无需展开说明。

## 注意事项

- 区分**真实密钥**（可被利用的实际值）和**占位符/模板值**（用于文档示例）。占位符应标注为低风险提示，不应标记为泄露。
- 搜索时，适当使用不区分大小写的匹配（`-i` 标志）。
- 仅在项目目录内搜索，不搜索系统范围。
- 如果项目使用不同的锁文件（如 `package-lock.json`、`yarn.lock`），相应调整检查方式。
- 始终进行全面搜索——表面快速扫描容易遗漏配置文件、源代码注释和构建脚本中嵌入的密钥。