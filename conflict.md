
# 🔄 Git Rebase Conflict Demo – Full Simulation with Resolution

---

## ✅ Full Command List to Simulate the Rebase Conflict

```bash
# STEP 1: Create a clean workspace
rm -rf git-rebase-conflict-demo
mkdir git-rebase-conflict-demo
cd git-rebase-conflict-demo
git init

# STEP 2: Create initial Go file and make the first commit (A)
echo 'package main

func isNice(num int) bool {
    return num == 0
}' > main.go

git add main.go
git commit -m "A: Initial commit with isNice returning num == 0"

# STEP 3: Create a new branch 'feature' and make a change (commit B)
git checkout -b feature

echo 'package main

func isNice(num int) bool {
    return num == 420
}' > main.go

git commit -am "B: feature branch changes return to 420"

# STEP 4: Switch back to main and make a conflicting change (commit C)
git checkout main

echo 'package main

func isNice(num int) bool {
    return num == 69
}' > main.go

git commit -am "C: main branch changes return to 69"

# STEP 5: Rebase feature onto main — triggers a conflict
git checkout feature
git rebase main
```

---

## 🔥 Expected Conflict Message

```bash
Auto-merging main.go
CONFLICT (content): Merge conflict in main.go
error: could not apply <commit hash>... B: feature branch changes return to 420
Resolve all conflicts manually, mark them as resolved with
"git add <file>", then run "git rebase --continue".
```

---

## 🛠 Resolving the Rebase Conflict via CLI

---

### 🥇 Step 1: View the Conflict

```bash
cat main.go
```

You’ll see:

```go
package main

func isNice(num int) bool {
<<<<<<< HEAD
    return num == 69
=======
    return num == 420
>>>>>>> B: feature branch changes return to 420
}
```

---

### ✍️ Step 2: Edit and Resolve the Conflict


```bash
echo 'package main

func isNice(num int) bool {
    return num == 420
}' > main.go
```

---

### ✅ Step 3: Mark Conflict as Resolved

```bash
git add main.go
```

---

### ✅ Step 4: Continue the Rebase

```bash
git rebase --continue
```

---

### 🧼 Step 5 (Optional): Abort the Rebase

If you want to cancel instead:

```bash
git rebase --abort
```

---

## 📌 Summary Table: Merge vs Rebase Conflict

| Command                 | Use Case                                     |
| ----------------------- | -------------------------------------------- |
| `git merge <branch>`    | Combine branches with potential merge commit |
| `git rebase <branch>`   | Replay commits on top of another branch      |
| `git status`            | See current conflict status                  |
| `git add <file>`        | Mark conflict as resolved                    |
| `git merge --continue`  | Continue after resolving merge conflict      |
| `git rebase --continue` | Continue after resolving rebase conflict     |
| `git rebase --abort`    | Abort the rebase if needed                   |



## ✅ Full Command List to Simulate the Merge Conflict

```bash
# STEP 1: Create a new directory and initialize Git
mkdir git-merge-conflict-demo
cd git-merge-conflict-demo
git init

# STEP 2: Create initial Go file and make the first commit (A)
echo "package main

func isNice(num int) bool {
    return num == 0
}" > main.go

git add main.go
git commit -m "A: Initial commit with isNice returning num == 0"

# STEP 3: Create a new branch 'feature' from here
git checkout -b feature

# STEP 4: Modify the return value to 420 in feature (commit C)
echo "package main

func isNice(num int) bool {
    return num == 420
}" > main.go

git commit -am "C: feature branch changes return to 420"

# STEP 5: Switch back to main and make a conflicting change (commit B)
git checkout main

echo "package main

func isNice(num int) bool {
    return num == 69
}" > main.go

git commit -am "B: main branch changes return to 69"

# STEP 6: Try to merge feature into main — this will trigger a conflict
git merge feature
```



### 🔥 Expected Result

At this point, Git will stop the merge and say something like:

```
Auto-merging main.go
CONFLICT (content): Merge conflict in main.go
Automatic merge failed; fix conflicts and then commit the result.
```

### 🛠 Resolving the Conflict 


```bash
echo 'package main

func isNice(num int) bool {
    return num == 69
}' > main.go
```
#### ✅ Step 3: Mark the conflict as resolved

```bash
git add main.go
```

#### ✅ Step 4: Complete the merge

```bash
git commit -m "Resolve merge conflict between main and feature"
```


## 📝 Summary Table: Handling Merge vs Rebase Conflicts

| Action      | After Conflict      | Next Command             | Result                              |
|-------------|---------------------|---------------------------|--------------------------------------|
| `git merge` | resolve + `git add` | `git commit`              | Merge commit with both parents       |
| `git rebase`| resolve + `git add` | `git rebase --continue`   | Linear history, no merge commit      |




