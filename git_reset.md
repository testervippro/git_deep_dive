
## 🧪 Example: `git reset --soft` – Keep changes staged after resetting

### ✅ Goal:

Use `git reset --soft` to move the HEAD back, **while keeping all changes in the staging area** (`git status: staged`), so you can re-commit or modify before committing.

---

### 📁 Step-by-Step Commands

```bash
# STEP 1: Create a folder and initialize Git
rm -rf git-soft-reset-demo 
mkdir git-soft-reset-demo && cd git-soft-reset-demo
git init
```


```bash
# STEP 2: Create and commit A
echo "Line 1" > file.txt
git add file.txt
git commit -m "A: First commit"
```

```bash
# STEP 3: Commit B
echo "Line 2" >> file.txt
git add file.txt
git commit -m "B: Second commit"
```

```bash
# STEP 4: Commit C
echo "Line 3" >> file.txt
git add file.txt
git commit -m "C: Third commit"
```

At this point:

```bash
git log --oneline
```
At this point:

```bash
git reflog
```

Shows:

```
c333333 C: Third commit
b222222 B: Second commit
a111111 A: First commit
```

---

### 🔁 STEP 5: Reset Soft to Previous Commit

```bash
git reset --soft HEAD~1
```

This moves HEAD from **commit C** back to **commit B**, **but keeps the changes from C staged**!

---

### 🔍 STEP 6: Inspect the result

```bash
git status
```

Output:

```
On branch main
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   file.txt
```

```bash
cat file.txt
```

Shows:

```
Line 1
Line 2
Line 3
```

```bash
git log --oneline
```

Shows:

```
b222222 B: Second commit
a111111 A: First commit
```

So:

* Commit C is gone from history ✅
* But its changes (Line 3) are still in `file.txt` and **staged** ✅

---

### 💡 Optional: Re-commit with a new message

```bash
git commit -m "C (new): Modified third commit"
```

You now have a modified history with the same content.

---

## ✅ Summary Table

| Command                    | Effect                                             |
| -------------------------- | -------------------------------------------------- |
| `git reset --soft HEAD~1`  | Moves HEAD back by 1, keeps all changes **staged** |
| `git reset --mixed HEAD~1` | Moves HEAD, **keeps changes unstaged** (default)   |
| `git reset --hard HEAD~1`  | Moves HEAD, **discards changes**                   |

---



## 🧪 Git Example: `git reset --hard` – Discard commits AND file changes

### ✅ Goal:

Use `git reset --hard` to move HEAD back and **discard both the commit and the working directory changes**.

---

### 📁 Step-by-Step Commands

```bash
# STEP 1: Create and initialize the repo
mkdir git-hard-reset-demo && cd git-hard-reset-demo
git init
```

---

```bash
# STEP 2: Commit A
echo "Line 1" > file.txt
git add file.txt
git commit -m "A: First commit"
```

```bash
# STEP 3: Commit B
echo "Line 2" >> file.txt
git add file.txt
git commit -m "B: Second commit"
```

```bash
# STEP 4: Commit C
echo "Line 3" >> file.txt
git add file.txt
git commit -m "C: Third commit"
```

Check status:

```bash
git log --oneline
```

```
c333333 C: Third commit
b222222 B: Second commit
a111111 A: First commit
```

Check file:

```bash
cat file.txt
```

```
Line 1
Line 2
Line 3
```

---

Here’s the properly formatted Markdown version of your full **reset and clean process**, with clear explanation:

---

## 🧨 STEP 5: Reset to Previous Commit (`HEAD~1`)

To move your repository one commit back and discard all changes in the working directory and staging area:

```bash
git reset --hard HEAD~1
```

> 🎯 This removes the **latest commit** and resets your files to the state of the commit before it.

---

##  Clean Untracked and Ignored Files

To remove **all untracked, uncommitted, and ignored files/folders**:

```bash
git clean -xfd
```

### 🧾 Options:

* `-x` – Remove files ignored by `.gitignore`
* `-f` – Force deletion
* `-d` – Include directories

---

## ✅ Final Result:

Your working directory will be **identical** to the commit at `HEAD~1`:

* No staged changes
* No untracked files
* No ignored files
* No leftover directories

---

### 🔍 Optional: Dry Run Before Deleting

To see what will be deleted before running the clean command:

```bash
git clean -xfdn
```

> 🕵️ Use this to preview changes and avoid accidental data loss.

```bash
git log --oneline
```

Output:

```
b222222 B: Second commit
a111111 A: First commit
```

```bash
cat file.txt
```

```
Line 1
Line 2
```

```bash
git status
```

```
On branch main
nothing to commit, working tree clean
```

---

### 💥 Summary: What `--hard` does

* ❌ **Commit C is deleted**
* ❌ **Line 3 is erased from file**
* ✅ Working tree and staging area are fully reset to commit B

---

## 🔁 Comparison: `--soft` vs `--hard`

| Aspect        | `git reset --soft HEAD~1`       | `git reset --hard HEAD~1`                |
| ------------- | ------------------------------- | ---------------------------------------- |
| HEAD position | Moves back to previous commit   | Moves back to previous commit            |
| Commit C      | Removed from history            | Removed from history                     |
| File changes  | ✅ Preserved (staged for commit) | ❌ Discarded (file restored to old state) |
| `git status`  | Shows changes staged            | Shows clean working directory            |
| Recoverable?  | ✅ Yes, easy to re-commit        | ❗ No, unless you use `git reflog`        |


