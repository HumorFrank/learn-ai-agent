---
name: deploy-github-actions
description: Deploy the Astro blog project via GitHub Actions workflow. Use this skill when the user mentions deploying, CI/CD, GitHub Actions, workflow, automated deployment, or wants to set up continuous deployment for the project. Also use when the user asks about deploying an Astro site, setting up build pipelines, or configuring GitHub Actions for static site deployment.
---

# Deploy via GitHub Actions

This skill creates a GitHub Actions workflow that automatically builds and deploys the Astro static blog when the `main` branch changes.

## What this skill does

Creates a `.github/workflows/deploy.yml` file that:
- Triggers only on pushes to `main`
- Uses pnpm as the package manager (with Corepack for version pinning)
- Installs dependencies, builds the Astro site, and deploys the `dist/` output

## Deployment target

Since the project outputs static files to `dist/`, the workflow supports multiple deployment targets. Ask the user which platform they want to deploy to, or default to **GitHub Pages** if they don't specify.

Common targets:
- **GitHub Pages** — free for public repos, no extra account needed
- **Vercel** — fast deploys, requires `VERCEL_TOKEN` secret
- **Netlify** — easy setup, requires `NETLIFY_AUTH_TOKEN` secret

## Workflow creation steps

### Step 1: Ensure pnpm is formally configured

The project uses pnpm but lacks a `packageManager` field. Add it to `package.json` to let GitHub Actions use Corepack for reliable pnpm installation.

Run this to determine the current pnpm version:
```bash
pnpm --version
```

Then add the `packageManager` field to `package.json`:
```json
"packageManager": "pnpm@<version>"
```

This is important because Corepack (used in the workflow) reads this field to install the exact pnpm version. Without it, the workflow would need to install pnpm manually via `npm i -g pnpm`, which is less reliable and doesn't guarantee version consistency.

### Step 2: Create the workflow file

Create `.github/workflows/deploy.yml` with the following structure. Adapt the deploy step based on the chosen platform.

#### GitHub Pages variant (default)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Vercel variant

If the user chooses Vercel, replace the deploy job with:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Install Vercel CLI
        run: pnpm add -g vercel@latest

      - name: Pull Vercel project
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build with Vercel
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

Remind the user to add `VERCEL_TOKEN` and `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` as repository secrets.

#### Netlify variant

If the user chooses Netlify, replace the deploy step with:

```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v3
  with:
    publish-dir: dist
    production-branch: main
    production-deploy: true
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Step 3: Configure Astro for the deployment target

For GitHub Pages, the `site` and `base` in `astro.config.mjs` need to match the deployment URL. If deploying to `https://<username>.github.io/<repo>/`, set:

```js
export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/<repo>/',
  // ... rest of config
})
```

If deploying to a custom domain or Vercel/Netlify, just set `site` to the actual domain.

### Step 4: Verify setup

After creating the workflow, remind the user to:
1. Commit and push to `main` to trigger the first deployment
2. For GitHub Pages: go to repo Settings > Pages > Source, select "GitHub Actions"
3. For Vercel/Netlify: add the required secrets in repo Settings > Secrets and variables > Actions

## Important constraints

- The workflow **only triggers on pushes to `main`** — this is intentional. PR builds or other branches are not deployed automatically.
- `--frozen-lockfile` ensures reproducible builds. If the lockfile is out of sync, the workflow fails rather than silently updating it.
- Node 20 is used as the LTS version. Adjust if the project requires a different version.
- The `concurrency` group ensures only one deployment runs at a time, canceling older runs if a newer push arrives.
