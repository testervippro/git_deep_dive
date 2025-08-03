### 🧠 **Git Remote 101 — Beginner’s Guide**

A **remote** in Git is a reference to a **version of your repository hosted elsewhere**, usually on platforms like **GitHub**, **GitLab**, or **Bitbucket**.

---

## ✅ Basic Commands You Should Know

### 1. 🔍 View Current Remotes

```bash
git remote -v
```

Shows the names and URLs of all remotes.

🧾 Output example:

```
origin  https://github.com/yourname/myrepo.git (fetch)
origin  https://github.com/yourname/myrepo.git (push)
```

---

### 2. ➕ Add a Remote

```bash
git remote add origin https://github.com/yourname/myrepo.git
```

* `origin` is the default name (you can choose another name).
* Used to connect your local repo to GitHub (or another remote).

---

### 3. ❌ Remove a Remote

```bash
git remote remove origin
```

---

### 4. 🔁 Change Remote URL

```bash
git remote set-url origin https://github.com/yourname/newrepo.git
```

---

### 5. 📦 Push to Remote

```bash
git push -u origin main
```

* Pushes your local `main` branch to remote `origin`.
* The `-u` sets tracking so you can do `git push` next time without typing the full command.

---

### 6. 📥 Pull from Remote

```bash
git pull origin main
```

Fetches and merges changes from the `origin/main` branch into your local `main`.

---

### 📘 Terminology Cheat Sheet

| Term       | Meaning                                               |
| ---------- | ----------------------------------------------------- |
| `origin`   | Default name for the remote (can be renamed)          |
| `upstream` | The remote branch your local branch is tracking       |
| `fetch`    | Downloads new commits from remote (but doesn't merge) |
| `pull`     | Fetch + Merge                                         |
| `push`     | Sends your commits to the remote repo                 |


