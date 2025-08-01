Great! Let's build a **complete Git lab** to practice **interactive rebase** with the commands for:

* ✅ `reorder`: change the order of commits
* ✅ `reword`: edit a commit message
* ✅ `squash`: combine commits
* ✅ `drop`: remove a commit

---

### 🧪 Step-by-Step Interactive Rebase Lab

#### 🔧 Step 0: Setup a new repo

```bash
mkdir rebase-lab
cd rebase-lab
git init
```

---

#### 📦 Step 1: Create 4 dummy commits

```bash
echo "1" > file.txt
git add file.txt
git commit -m "commit 1: add 1"

echo "2" >> file.txt
git add file.txt
git commit -m "commit 2: add 2"

echo "3" >> file.txt
git add file.txt
git commit -m "commit 3: add 3"

echo "4" >> file.txt
git add file.txt
git commit -m "commit 4: add 4"
```

---

#### 🔍 Step 2: Confirm commit history

```bash
git log --oneline
```

Expected:

```
d4f9c67 commit 4: add 4
8c91a63 commit 3: add 3
7b2e9b2 commit 2: add 2
a1d2fc3 commit 1: add 1
```

---

#### ✍️ Step 3: Run interactive rebase on last 4 commits

```bash
git rebase -i HEAD~4
```

Your editor will show:

```
pick a1d2fc3 commit 1: add 1
pick 7b2e9b2 commit 2: add 2
pick 8c91a63 commit 3: add 3
pick d4f9c67 commit 4: add 4
```

---

### ✨ Make changes in editor:

Modify like this:

```
pick a1d2fc3 commit 1: add 1
reword 7b2e9b2 commit 2: add 2
squash 8c91a63 commit 3: add 3
drop d4f9c67 commit 4: add 4
```

➡️ This does:

* **Keep commit 1**
* **Edit commit 2 message**
* **Squash commit 3 into commit 2**
* **Remove commit 4**

After saving the editor:

* It’ll prompt for a new message for the squashed commit.
* Save that, and the rebase finishes.

---

#### ✅ Step 4: Verify the result

```bash
git log --oneline
cat file.txt
```

Expected result:

* Only 2 commits (commit 1 and modified commit 2+3).
* `file.txt` contains:

  ```
  1
  2
  3
  ```

