
# GitLab Pipeline Trigger via API – Full Guide

## 1. Create a Pipeline Trigger Token

1. Go to your GitLab project → **Settings → CI/CD → Pipeline triggers**
2. Click **Add trigger**
3. Save the **Token** (e.g., `glptt-xxxxxxxx`)

> ⚠ Note: Pipeline Trigger Token is **different** from a Personal Access Token (PAT).

---

## 2. GitLab CI/CD `.gitlab-ci.yml` Example

### Playwright Tests + Deploy Pages

```yaml
stages:
  - test
  - deploy

variables:
  NODE_ENV: test
  PLAYWRIGHT_BROWSERS_PATH: 0  # Install browsers in project directory

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

before_script:
  - apt-get update && apt-get install -y curl unzip xvfb
  - curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
  - apt-get install -y nodejs
  - node -v
  - npm -v

test_playwright:
  stage: test
  image: mcr.microsoft.com/playwright:v1.47.0-jammy
  script:
    - npm ci
    - npx playwright install --with-deps
    - xvfb-run npx playwright test --reporter=html || true
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 1 week

deploy_pages:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache git
    - mkdir .public
    - cp -r playwright-report/* .public/
  artifacts:
    paths:
      - .public
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'   # only run on main branch
```

> ⚠ Note: **Do not use `only` and `rules` together** in the same job. Otherwise, GitLab will throw:
> `jobs:deploy_pages config key may not be used with 'rules': only`

---

## 3. Trigger Pipeline Using `curl` (Windows CMD)

### **Single-line syntax**

```cmd
curl -k -X POST "https://gitlab.com/api/v4/projects/<project_id>/trigger/pipeline?token=<trigger_token>&ref=main"
```

* `-k` → ignore SSL certificate errors on Windows (schannel CRYPT\_E\_NO\_REVOCATION\_CHECK)
* `<project_id>` → numeric project ID (not URL or repo name)
* `<trigger_token>` → token from step 1
* `ref` → branch to run pipeline

### **Add pipeline variables**

```cmd
curl -k -X POST "https://gitlab.com/api/v4/projects/<project_id>/trigger/pipeline?token=<trigger_token>&ref=main" -F "variables[DEPLOY_ENV]=dev"
```

---

## 4. Common Errors & Fixes

| Error                                                             | Cause                                  | Fix                                                                             |
| ----------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- |
| `404 Not Found`                                                   | Wrong API URL, project ID, or token    | URL must start from `https://gitlab.com/api/v4/...`, project ID must be numeric |
| `schannel CRYPT_E_NO_REVOCATION_CHECK`                            | Windows curl SSL check                 | Add `-k` or use PowerShell `Invoke-RestMethod`                                  |
| `jobs:deploy_pages config key may not be used with 'rules': only` | `.gitlab-ci.yml` uses `only` + `rules` | Only keep **one** of them (`rules` recommended)                                 |

---

## 6. Summary

1. Create a **Pipeline Trigger Token** in the project
2. Make sure `.gitlab-ci.yml` is valid (use **rules** or **only**, not both)
3. Trigger pipeline via API:

   * **Windows CMD curl**: 1-line command, use `-k` if needed
   * **PowerShell**: use `Invoke-RestMethod`
4. Pass pipeline variables with `-F "variables[VAR]=value"`


