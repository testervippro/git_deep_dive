

## 🧪 Git: `merge` vs `rebase`

Let’s walk through a **Git example** comparing `merge` and `rebase`, showing how each affects commit history using `git log`.



## 🔧 Setup

### 1. Create a new Git repo

```bash
mkdir rebase-vs-merge && cd rebase-vs-merge
git init
```

### 2. Make an initial commit

```bash
echo "Init" > file.txt
git add file.txt
git commit -m "A: Initial commit"
```

### 3. Create a `feature` branch and commit

```bash
git checkout -b feature
echo "Feature 1" >> file.txt
git commit -am "B: Commit on feature branch"
```

### 4. Switch to `main` (or `master`) and make another commit

```bash
git checkout master
echo "Main 1" >> file.txt
git commit -am "C: Commit on master"
```

---

## ✅ Case 1: `git merge`

```bash
git checkout feature
git merge master
```

### 🔍 View Git log

```bash
git log --oneline --graph --all --decorate
```

Expected output:

```
*   e3c1234 (HEAD -> feature) Merge branch 'master' into feature
|\
| * a1b2c3d (master) C: Commit on master
* | 9f8e7d6 B: Commit on feature branch
|/
* 1234567 A: Initial commit
```

🟢 **Result**: A **merge commit** is created — preserving both histories.

---

## ✅ Case 2: `git rebase`

Let’s reset and try rebase.

```bash

git checkout master
git branch -D feature  # delete old feature branch
git checkout -b feature 1234567  # restart from commit A

echo "Feature 1" >> file.txt
git commit -am "B: Commit on feature branch"

git checkout master
echo "Main 1" >> file.txt
git commit -am "C: Commit on master"

git checkout feature
git rebase master
```

### 🔍 View Git log

```bash
git log --oneline --graph --all --decorate
```

Expected output:

```
* 8a9b7c6 (feature) B: Commit on feature branch
* a1b2c3d (master) C: Commit on master
* 1234567 A: Initial commit
```

🟢 **Result**: A **linear history**, no merge commit.



## 📊 Summary Table

| Feature           | `git merge`                | `git rebase`                   |
| ----------------- | -------------------------- | ------------------------------ |
| History Shape     | Full, branched history     | Linear, rewritten history      |
| Merge Commits     | ✅ Yes                      | ❌ No                           |
| Use Case          | Shared branches            | Local, cleanup before merge    |
| Safe for public?  | ✅ Yes                      | ⚠️ No (only safe on private)   |


