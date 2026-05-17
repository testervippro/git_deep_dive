# 🧪 Git: `merge` vs `rebase`

This guide demonstrates:

* `git merge`
* `git rebase`
* Fast-forward merge
* How commit history changes
* How to read the Git graph

---

# 🔧 Setup

## 1. Create a new Git repository

```bash
rm -rf rebase-vs-merge

mkdir rebase-vs-merge
cd rebase-vs-merge

git init
```

---

# 2. Create the initial commit

```bash
cat > file.txt <<EOF
Line 1
Line 2
Line 3
EOF

git add .
git commit -m "A: Initial commit"
```

Graph:

```txt
A
```

---

# ✅ Case 1: `git merge`

---

## 3. Create a `feature` branch

```bash
git checkout -b feature
```

---

## 4. Make a commit on `feature`

```bash
sed -i '' 's/Line 1/Feature change/' file.txt

git commit -am "B: Feature updates line 1"
```

Graph:

```txt
A
 \
  B
```

---

## 5. Switch back to `main`

> New Git versions use `main` instead of `master`.

```bash
git checkout main
```

---

## 6. Make another commit on `main`

```bash
sed -i '' 's/Line 3/Main change/' file.txt

git commit -am "C: Main updates line 3"
```

Graph:

```txt
A --- C
 \
  B
```

---

## 7. Merge `main` into `feature`

```bash
git checkout feature
git merge main
```

Git creates a merge commit.

---

# 🔍 View Git log

```bash
git log --oneline --graph --all --decorate
```

Expected output:

```txt
*   6a9a0ce (HEAD -> feature) Merge branch 'main' into feature
|\
| * 82b17a9 (main) C: Main updates line 3
* | 3e0667c B: Feature updates line 1
|/
* 91de973 A: Initial commit
```

---

# 📌 How to read this graph

```txt
*   Merge commit
|\
| * Commit on main
* | Commit on feature
|/
* Initial commit
```

Meaning:

1. Start from commit `A`
2. Branch split into:

   * `feature` → commit `B`
   * `main` → commit `C`
3. Both histories were merged together into a new merge commit

---

# ✅ Result of `git merge`

* Both branch histories are preserved
* A merge commit is created
* History becomes non-linear

Graph:

```txt
A --- C -------- M
 \              /
  B ------------
```

---

# ✅ Case 2: `git rebase`

Now let’s recreate the same scenario using rebase.

---

## 1. Reset repository

```bash
rm -rf .git

git init
```

---

## 2. Recreate initial commit

```bash
cat > file.txt <<EOF
Line 1
Line 2
Line 3
EOF

git add .
git commit -m "A: Initial commit"
```

---

## 3. Create `feature` branch

```bash
git checkout -b feature
```

---

## 4. Commit on `feature`

```bash
sed -i '' 's/Line 1/Feature change/' file.txt

git commit -am "B: Feature updates line 1"
```

---

## 5. Switch back to `main`

```bash
git checkout main
```

---

## 6. Commit on `main`

```bash
sed -i '' 's/Line 3/Main change/' file.txt

git commit -am "C: Main updates line 3"
```

Graph before rebase:

```txt
A --- C
 \
  B
```

---

## 7. Rebase `feature` onto `main`

```bash
git checkout feature
git rebase main
```

Git takes commit `B` and replays it on top of `C`.

---

# 🔍 View Git log

```bash
git log --oneline --graph --all --decorate
```

Expected output:

```txt
* 7f8e9d1 (HEAD -> feature) B: Feature updates line 1
* 82b17a9 (main) C: Main updates line 3
* 91de973 A: Initial commit
```

---

# ✅ Result of `git rebase`

* No merge commit
* History becomes linear
* Commit `B` is rewritten as a new commit

Graph:

```txt
A --- C --- B'
```

`B'` = replayed version of commit `B`

---

# 📊 Merge vs Rebase

| Feature                 | `git merge`            | `git rebase`               |
| ----------------------- | ---------------------- | -------------------------- |
| History Shape           | Branched history       | Linear history             |
| Merge Commit            | ✅ Yes                  | ❌ No                       |
| Rewrites History        | ❌ No                   | ✅ Yes                      |
| Safe on Shared Branches | ✅ Yes                  | ⚠️ Dangerous               |
| Best Use Case           | Shared/public branches | Local cleanup before merge |

---

# ✅ Fast-Forward Merge Example

A fast-forward merge happens when:

```txt
main has no new commits
```

and the target branch is simply behind another branch.

---

## 1. Create repository

```bash
mkdir fast-forward-demo
cd fast-forward-demo

git init
```

---

## 2. Initial commit

```bash
echo "Start" > file.txt

git add .
git commit -m "A: Initial commit"
```

Graph:

```txt
A
```

---

## 3. Create `feature` branch

```bash
git checkout -b feature
```

---

## 4. Commit on `feature`

```bash
echo "Feature work" >> file.txt

git commit -am "B: Commit on feature branch"
```

Graph:

```txt
A --- B
        ^
     feature
```

`main` is still pointing to `A`.

---

## 5. Merge into `main`

```bash
git checkout main
git merge feature
```

Because `main` has no extra commits, Git simply moves the `main` pointer forward.

No merge commit is needed.

---

# 🔍 Git log after fast-forward

```bash
git log --oneline --graph --all --decorate
```

Expected output:

```txt
* b1b2b3b (HEAD -> main, feature) B: Commit on feature branch
* a1a2a3a A: Initial commit
```

---

# ✅ Result of Fast-Forward Merge

* No merge commit
* Linear history
* Git only moves the branch pointer

Graph:

```txt
A --- B
```

Both branches point to the same commit.

---

# 🧠 Key Mental Models

## `merge`

```txt
Combine histories
```

---

## `rebase`

```txt
Rewrite history
```

---

## Fast-forward merge

```txt
Move branch pointer forward
```
