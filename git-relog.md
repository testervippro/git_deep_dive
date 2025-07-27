

# 🛠️ Git Recovery & Merge Conflict Demo – Full Commands & Verification

---

## 🧹 0. Clean Up and Set Up a New Directory

```bash
# Delete previous folder (if exists)
rm -rf git-merge-conflict-demo

# Create and navigate into a fresh folder
mkdir git-merge-conflict-demo
cd git-merge-conflict-demo
```

---

## 🌟 1. Initialize Git Repo and Make Commits

```bash
git init

# Create initial file
echo "Initial content" > file.txt
git add file.txt
git commit -m "Initial commit"

# Create 'feature' branch and commit changes
git checkout -b feature
echo "Feature A" >> file.txt
git commit -am "Add feature A"
echo "Feature B" >> file.txt
git commit -am "Add feature B"

# ✅ Check file content
cat file.txt
```

Expected output:

```text
Initial content
Feature A
Feature B
```

---

## 🗑️ 2. Delete the `feature` Branch (Accidentally)

```bash
git checkout main            # Switch to main
git branch -D feature        # Force delete branch
```

---

## 🔍 3. Check History Using `git reflog`

```bash
git reflog
```

Example output:

```bash
a1b2c3d HEAD@{0}: checkout: moving from feature to main
b2c3d4e HEAD@{1}: commit: Add feature B
c3d4e5f HEAD@{2}: commit: Add feature A
```

---

## ♻️ 4. Recover Deleted Branch or Commits

---

### ✅ Option 1: Recreate Branch from Commit

```bash
git checkout -b feature b2c3d4e

# ✅ Check file content
cat file.txt
```

Expected output:

```text
Initial content
Feature A
Feature B
```

---

### ✅ Option 2: Use `git merge HEAD@{n}` include n

```bash
# While on 'main', recover each commit
git merge HEAD@{2} -m "Recovered: Add feature A"
git merge HEAD@{1} -m "Recovered: Add feature B"

# ✅ Check file content
cat file.txt
```

---

### ✅ Option 3: Use `git cherry-pick HEAD@{n}`

```bash
# Alternatively apply specific commits
git cherry-pick HEAD@{2}   # Add feature A
git cherry-pick HEAD@{1}   # Add feature B

# ✅ Check file content
cat file.txt
```

---

## 🛑 5. Recover Lost Commit After `git reset --hard`

```bash
# Simulate a work-in-progress commit
echo "Temporary work" >> file.txt
git add file.txt
git commit -m "Work in progress"

# Oops! Lost the commit
git reset --hard HEAD~1
```

### 🔁 Recovery via Reflog

```bash
git reflog
# Find lost commit hash, e.g., d4e5f6a
git checkout -b recovery d4e5f6a

# ✅ Check file content
cat file.txt
```

---

## 🔄 6. Undo a Broken `git rebase`

```bash
git rebase main
# Something went wrong...
```

### 🔙 Roll Back with Reflog

```bash
git reflog
# Locate commit before rebase, e.g., abc123
git reset --hard abc123

# ✅ Check file content
cat file.txt
```

---

## 📌 Summary Table

| Command                         | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `git checkout HEAD@{n}`         | View old state (temporary, detached HEAD)     |
| `git merge HEAD@{n}`            | Restore commit(s) into current branch history |
| `git cherry-pick HEAD@{n}`      | Apply specific commit(s) cleanly              |
| `git reset --hard <hash>`       | Hard reset to a specific commit               |
| `git checkout -b <name> <hash>` | Create branch from specific commit            |
| `cat file.txt`                  | ✅ Confirm file content after recovery         |

---

## ✅ How to Repeat for Multiple Commits

```bash
# Use reflog to find multiple old commits
git merge HEAD@{3} -m "Recovered A"
git merge HEAD@{2} -m "Recovered B"

# OR cherry-pick selectively
git cherry-pick HEAD@{3}
git cherry-pick HEAD@{2}

# ✅ Then verify file
cat file.txt
```

