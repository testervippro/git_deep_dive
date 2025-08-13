
# 🧪 How to Deploy Playwright Test Reports to GitHub Pages with GitHub Actions

And helps you configure a **working CI/CD pipeline** that publishes Playwright HTML reports to **GitHub Pages**.


## ✅ Prerequisites

* A GitHub repository with Playwright tests
* A working GitHub Actions workflow
* You want to deploy your HTML test report (`playwright-report/`) to GitHub Pages

---

## ⚙️ Step-by-Step Setup

---

### 🔧 Step 1: Enable GitHub Pages in Your Repository

1. Go to your repository on GitHub.
2. Navigate to:
   **Settings → Pages**
3. Under **"Build and deployment"**, choose:

   * **Source**: `Deploy from a branch`
   * **Branch**: `gh-pages`
   * **Folder**: `/ (root)`
4. Click **Save**.

📌 GitHub will serve your report at:

```
https://<your-username>.github.io/<repo-name>/
```

---

### 🔐 Step 2: Grant Write Access to GitHub Actions

1. Go to **Settings → Actions → General**
2. Scroll down to **Workflow permissions**
3. Select:

   * ✅ **Read and write permissions**
4. Click **Save**

This gives the `github-actions[bot]` permission to push to branches like `gh-pages`.

---

### 🛡️ Step 3: (Optional) Check Branch Protection Rules

1. Go to **Settings → Branches**
2. Under **Branch protection rules**, make sure `gh-pages`:

   * ❌ Does **not** require pull requests to merge
   * ✅ Allows **GitHub Actions** to push

If needed, temporarily remove protection while testing.

---
---

### 🧪 Step 4: Update GitHub Actions Workflow

Here’s a full working example:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: CI=true xvfb-run npx playwright test --reporter=html
        continue-on-error: true  #  Prevents failure from stopping deployment

      - name: Deploy Playwright report to GitHub Pages
        if: always()  #  Always runs, even if tests fail
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./playwright-report
```

