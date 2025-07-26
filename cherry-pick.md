

## ✅ Full Example: `git cherry-pick`

### 🔧 Step 1: Initialize a new repo

```bash
rm -rf  git-cherry-pick-demo
mkdir git-cherry-pick-demo
cd git-cherry-pick-demo
git init
```

---

### 📄 Step 2: Create initial commit `A`

```bash
echo "Line A" > file.txt
git add file.txt
git commit -m "A: initial commit"
```

---

### ➕ Step 3: Add `B` and commit

```bash
echo "Line B" >> file.txt
git add file.txt
git commit -m "B: added line B"
```

---

### ➕ Step 4: Add `C` and commit

```bash
echo "Line C" >> file.txt
git add file.txt
git commit -m "C: added line C"
```

---

### 👀 Step 5: View commit history (get commit hashes)

```bash
git log --oneline
```

Expected output:

```
<hash-C> C: added line C
<hash-B> B: added line B
<hash-A> A: initial commit
```

---

### 🌿 Step 6: Create a new branch (e.g., `feature`) from A

```bash
git checkout <hash-A>
git checkout -b feature
```

Now you're on a new branch from `A`.

---

### 🍒 Step 7: Cherry-pick commit `B`

```bash
git cherry-pick <hash-B>
```

This applies only commit `B` to your current branch.

---

### 📋 Step 8: Check history

```bash
git log --oneline
```

Expected output:

```
<new-hash-B> B: added line B
<hash-A> A: initial commit
```

✅ You now have only A and B on this branch — commit `C` is excluded.

---

### 📂 Optional: View file contents

```bash
cat file.txt
```

Expected:

```
Line A
Line B
```
