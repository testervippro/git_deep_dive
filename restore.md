
## ✅ 1. Undo file changes (working directory) — Safe and specific

> **Use case**:
> *"I changed a file, but I want to discard those changes before committing."*

### 🔧 Command:

```bash
# Make a change to a file
echo "New content" >> app.py

# Discard the change and restore to last commit
git restore app.py
```

### 📌 What it does:

* It restores `app.py` from the **latest commit**.
* Only affects the **working directory**, not staging or commit history.

---

## ✅ 2. Undo `git add` (unstage a file)

> **Use case**:
> *"I staged a file using `git add`, but I don’t want to include it in the next commit."*

### 🔧 Command:

```bash
git add app.py      # Stage the file
git restore --staged app.py
```

### 📌 What it does:

* Removes the file from the **staging area**, keeps the changes in the working directory.

---

## 🔁 Alternative if `git restore` is not used

If you’re using an **older version of Git** (before v2.23, when `git restore` was introduced), you can achieve the same things using:

### 🅰️ For working directory restore:

```bash
# Equivalent to `git restore app.py`
git checkout -- app.py
```

### 🅱️ For unstage a file:

```bash
# Equivalent to `git restore --staged app.py`
git reset HEAD app.py
```

---

## 🆕 Summary: `restore` vs `reset` vs `checkout`

| Action                           | Old Way (`reset/checkout`) | New Way (`restore`)                                  |
| -------------------------------- | -------------------------- | ---------------------------------------------------- |
| Discard changes in file          | `git checkout -- file`     | `git restore file`                                   |
| Unstage a file                   | `git reset HEAD file`      | `git restore --staged file`                          |
| Discard and unstage changes both | `git reset --hard`         | `git restore --source=HEAD --staged --worktree file` |

> ✅ `git restore` is **more specific and safer**, designed for clarity.

Would you like a visual demo or a Git log to follow along?
