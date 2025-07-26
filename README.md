
# 🧠 Introduction to Git

**Git** is a distributed version control system (VCS). Nearly every developer in the world uses it to manage their code. It has a virtual monopoly on VCS tools.

## 🔧 Install Git

Download Git from the official site:

 [https://git-scm.com/downloads](https://git-scm.com/downloads)

###  Check your Git version:

```bash
git --version
```

---

##  Quick Configuration

Configure Git to track your identity when you make commits.

```bash
git config --global user.name "your_github_username"
git config --global user.email "your_email@example.com"
```

> 🪪This info is stored in the global `.gitconfig` file.

###🔍 View your Git config

* On **Linux/macOS**:

  ```bash
  cat ~/.gitconfig
  ```

* On **Windows CMD**:

  ```cmd
  type %USERPROFILE%\.gitconfig
  ```

---

## 🚀 Initialize a Git Project

To start tracking a new project:

```bash
git init
```

This creates a hidden `.git/` folder.

About structure refence concept.md

Example object location:

```
.git/objects/af/2c0b3f9a233cf91e1b10c8e1...
# SHA-1 hash is split into folder structure
```

---

The most  git command
## 🔍 `git status` – Track Changes

When you run:

```bash
git status
```

Git tells you the state of your working directory and staging area:

* **Untracked** – File is new and not being tracked
* **Staged** – File is marked to be included in the next commit
* **Committed** – File has been saved to Git’s history

---

##  Stage Files for Commit

To add a file to the staging area:

```bash
git add <filename>
```

 ## To add all files:

```bash
git add .
```

## To commit 
```bash
git commit -m "your message here"
``` 

## To see the history of commits in your repository:

```bash
git log
```

This shows a list of commits in reverse chronological order (most recent first), including the commit hash, author, date, and message.

---

## Common `git log` Flags

```bash
# Show each commit in a single line: short SHA + message
git log --oneline
```

```bash
# Visualize branch/merge history as an ASCII tree
git log --graph
```

```bash
# Display references (branches, tags) next to the commits
git log --decorate
```

```bash
# Show full parent commit SHAs of each commit (useful for merges)
git log --parents
```

```bash
# Show full with mutiple options
git log --oneline --graph --decorate --parents

```


```bash
# To see log in remote
git log origin/features
```



A **branch** is just a named pointer to a specific commit. Git uses branches to allow parallel development.



## Visualizing Branches

Here's an example of two branches in a repository:

```
A - B - C  (main)
     \
      D - E  (other_branch)
```

* The `main` branch progresses from A → B → C
* The `other_branch` branched off at commit `B` and added commits `D` and `E`

---

## Create and Switch to a New Branch

To create a new branch and switch to it:

```bash
git switch -c my_new_branch
```

## To switch to a branch

```bash
git switch prime
```

## Merging Branches in Git

Merging is how Git combines the work from different branches.

---

### Example Merge Scenario

```
A - B - C - E   (main)
     \
      D        (add_classics)
```

To merge the `add_classics` branch into `main`:

```bash
git switch main
git merge add_classics
```

---

### What Git Does During a Merge

1. **Find the Merge Base** – Git finds the common ancestor of the two branches. In this case, commit `A`.
2. **Replay Changes from Feature** – Git applies changes from `add_classics` on top of `main`.
3. **Create a New Commit** – Git records the result as a **merge commit**, e.g., `F`, which has **two parents** (`C` and `E`).

After merge:

```
A - B - C - F    main
   \     /
    D - E        vimchadsonly
```

---

### Merge Log Example

Running:

```bash
git log --oneline --decorate --graph --parents
```

Might produce output like:

```
*   89629a9 d234104 b8dfd64 (HEAD -> main) F: Merge branch 'add_classics'
|\
| * b8dfd64 fba0999 (tag: 5.8, add_classics) D: add classics
* | d234104 fba0999 (tag: 6.1) E: update contents
|/
* fba0999 1381199 (tag: 3.8, origin/master, origin/main, master) C: add quotes
* 1381199 a21228f (tag: 3.7) B: add titles.md
* a21228f           A: add contents.md
```

#### Explanation:

* Each `*` is a commit.
* Multiple hashes on one line due to `--parents`, showing the commit and its parents.
* The merge commit `89629a9` has two parents: `d234104` and `b8dfd64`.

---

## Fast-Forward Merge

Sometimes Git can do a **fast-forward** merge, which just moves the pointer forward without creating a new merge commit.

Example:

Before merge:

```
  C     (delete_vscode)
 /
A - B   (main)
```

Run:

```bash
git switch main
git merge delete_vscode
```

Git sees `main` is behind `delete_vscode` and simply **moves the `main` pointer** forward to `C`:

```
A - B - C   (main, delete_vscode)
```

>  No new commit is created — this is a **fast-forward** merge.


## Rebasing in Git

**Rebase** is a Git command that allows you to move or "replay" commits from one branch onto another. Unlike `merge`, rebase creates a **linear history** by changing the base of your branch.

---

### Visualizing Rebase

Before rebasing `feature_branch` onto `main`:

```
A - B - C    (main)
     \
      D - E  (feature_branch)
```

After rebasing `feature_branch` onto `main`:

```
A - B - C         (main)
           \
            D' - E'   (feature_branch)
```

> `D'` and `E'` are **new commits** that represent the rebased versions of `D` and `E`.

---

### Rebase Commands

To rebase your feature branch onto the latest `main`:

```bash
git checkout feature_branch
git rebase main
```

## Undoing Changes in Git

Sometimes you need to undo commits and return to a previous state in your project. The `git reset` command allows you to move the HEAD pointer and optionally modify your working directory and staging area.

---

### `--soft` Reset

The `--soft` option moves the HEAD pointer to a previous commit but **keeps all your changes staged**.

```bash
git reset --soft <commit_hash>
```

* **Committed changes**: become **unstaged but remain staged for commit**
* **Uncommitted changes**: stay **staged or unstaged** as they were

Use this if you want to uncommit changes but **preserve your work** for re-editing or re-committing.

---

### `--hard` Reset

The `--hard` option moves the HEAD pointer to a previous commit and **discards all changes** in your working directory and staging area.

```bash
git reset --hard <commit_hash>
```

* **All changes** after the specified commit are **lost**
* Useful when you want to **completely discard work** and start from a clean state

> ⚠️ **Warning:** This is destructive. All changes will be permanently deleted and cannot be recovered unless backed up or committed elsewhere.


##  Git Remote 
* **Remote**: A version of your repository hosted elsewhere (e.g., GitHub).

```bash
# View remotes
git remote -v
```

```bash
# Add a remote
git remote add origin <repo-url>
```

```bash
# Push changes to a remote branch
git push origin <branch>
```

```bash
# Pull changes from a remote branch
git pull origin <branch>
```

```bash
# Fetch changes without merging
git fetch origin
```

```bash
# Push and set upstream tracking
git push -u origin <branch>
```


## Pull Changes from a Remote Branch(default will auto merger)
```bash
git pull origin <branch>
```

```bash
# To pull with re-base
git pull --rebase origin <branch>
```


```bash
# Config global become rebase
git config --global pull.rebase true
```


## `.gitignore` — Example Ignoring `node_modules`

To ignore all directories named `node_modules` (at any level of the project), add this line to your `.gitignore`:

```gitignore
node_modules
```

###  This ignores:

* `node_modules/code.js`
* `src/node_modules/code.js`
* `src/node_modules/`

###  This does **not** ignore:

* `src/node_modules_2/code.js`
* `env/node_modules_3/`



## HEAD

You'll often hear the term **HEAD** in Git. Here's a simple way to understand it:

> **HEAD** is the reference to the current branch you're on. In simple terms:  
> **"HEAD mean where me at now."**

You can view where HEAD is pointing using:

```bash
cat .git/HEAD
````

## Reflog

The `git reflog` command (pronounced **ref-log**, not **re-flog**) is similar to `git log`, but it specifically logs the changes made to a Git **reference** (like HEAD or branches) over time.

Reflog tracks the movement of HEAD and other references, using a numbered format:

| Reflog Reference | Meaning                    |
| ---------------- | -------------------------- |
| `HEAD@{0}`       | Where HEAD is now          |
| `HEAD@{1}`       | Where HEAD was 1 move ago  |
| `HEAD@{2}`       | Where HEAD was 2 moves ago |
| `HEAD@{3}`       | Where HEAD was 3 moves ago |

You can view the reflog with:

```bash
git reflog
```

# Recovering with Git Reflog

`git reflog` is a powerful tool that helps you recover from many mistakes in Git. It tracks updates to the **HEAD** reference and can be used to restore lost commits, branches, and more.

## 🔁 Recover Deleted Branch

If you accidentally delete a branch:

```bash
git branch -D my-feature
````

You can recover it using:

```bash
git reflog
# Find the commit hash before deletion
git checkout -b my-feature <commit-hash>
```

---

## 💥 Recover After `git reset --hard`

If you ran:

```bash
git reset --hard HEAD~2
```

And lost some commits, you can recover them:

```bash
git reflog
# Find the commit hash before the reset
git reset --hard <commit-hash>
```

---

## ⚠️ Recover from Accidental Rebase

If you did a bad rebase:

```bash
git rebase -i HEAD~3
```

And things broke, you can undo it:

```bash
git reflog
# Find the commit hash before the rebase
git reset --hard <commit-hash>
```

---


































