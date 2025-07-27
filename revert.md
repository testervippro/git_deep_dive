
## 🧪 Full Example: `git revert` to Undo a Commit (Safely)

### ✅ Goal:

Undo a bad commit (e.g., broken code) using `git revert`, and show how it creates a new commit that cancels the changes of the old one.

---

### 📁 Step-by-Step Example

```bash
# STEP 1: Create a new Git repo
rm -rf git-revert-demo
mkdir git-revert-demo && cd git-revert-demo
git init
```

---

```bash
# STEP 2: Commit A – First line
echo "Line 1" > file.txt
git add file.txt
git commit -m "A: Add Line 1"
```

---

```bash
# STEP 3: Commit B – Second line
echo "Line 2" >> file.txt
git add file.txt
git commit -m "B: Add Line 2"
```

---

```bash
# STEP 4: Commit C – Third line (bad commit)
echo "Line 3 (bad)" >> file.txt
git add file.txt
git commit -m "C: Add broken line 3"
```

---

Check file and log:

```bash
cat file.txt
```

```
Line 1
Line 2
Line 3 (bad)
```

```bash
git log --oneline
```

```
c333333 C: Add broken line 3
b222222 B: Add Line 2
a111111 A: Add Line 1
```

---

### 🛠 STEP 5: Revert the bad commit (C)


```bash
git revert HEAD --no-edit
```

---

### 🔍 STEP 6: Check result

```bash
cat file.txt
```

```
Line 1
Line 2
```

✅ Line 3 is gone!

```bash
git log --oneline
```

```
d444444 Revert "C: Add broken line 3"
c333333 C: Add broken line 3
b222222 B: Add Line 2
a111111 A: Add Line 1
```

🧠 Notice: The **bad commit is still there**, but a **new commit** undoes its changes!

---

## ✅ Summary: `git revert` vs `reset`

| Feature               | `git revert`         | `git reset`                        |
| --------------------- | -------------------- | ---------------------------------- |
| History preserved     | ✅ Yes                | ❌ No (rewrites history)            |
| Safe for shared repos | ✅ Yes (use in teams) | ❌ No (causes conflicts in remotes) |
| Creates a new commit  | ✅ Yes (undo commit)  | ❌ No (just moves pointer)          |
| Keeps original commit | ✅ Yes                | ❌ No (commit is removed from view) |

---

## 📦 Bonus: Revert an older commit (not just `HEAD`)

```bash
git log --oneline
```

```
d444444 Revert "C: ..."
c333333 C: Add broken line 3
b222222 B: Add Line 2
a111111 A: Add Line 1
```

To revert commit **B**:

```bash
git revert b222222
```
