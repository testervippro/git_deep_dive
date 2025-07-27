
## 🧠 Core Concepts of Git

Git is a **distributed version control system (DVCS)** that tracks changes in source code during software development. Its power lies in:

* **Snapshots, not differences** – Each commit is a full snapshot of your files, not just a diff.
* **Local operations** – Most Git commands work without network access.
* **Integrity** – Everything is checksummed using SHA-1 (or SHA-256).
* **Data is stored as objects** – Every file, directory, commit, and tag is an object.

---

## 🗂️ Structure of the `.git` Directory

When you initialize a Git repository (`git init`), Git creates a hidden `.git/` directory which contains **all metadata** and **object history** for your project:

| File/Folder   | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `HEAD`        | Points to the current branch (e.g., `ref: refs/heads/main`)                    |
| `config`      | Repository-specific configuration (user name, email, remotes, etc.)            |
| `description` | Used by GitWeb (can usually be ignored in standard Git projects)               |
| `hooks/`      | Contains custom scripts triggered by Git lifecycle events (`pre-commit`, etc.) |
| `info/`       | Contains the `exclude` file (like `.gitignore`, but local-only)                |
| `objects/`    | Stores all project content as **Git objects** (blobs, trees, commits, tags)    |
| `refs/`       | Stores pointers to branches (`heads/`), tags (`tags/`), and remotes            |
| `index`       | A staging area (used to prepare snapshots for the next commit)                 |
| `logs/`       | Tracks all ref updates (used by `git reflog` for history recovery)             |
| `packed-refs` | Stores compressed refs for performance when you have many tags/branches        |

---

## 📦 `.git/objects/` – Git Object Storage

Git compresses and stores all repository content inside `.git/objects/` using a key–value store:

| Object Type | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| **Blob**    | Represents file content (no filename or path info)               |
| **Tree**    | Represents a directory (contains blobs and trees)                |
| **Commit**  | Points to a tree and contains metadata (author, parent, message) |
| **Tag**     | Points to a specific commit with a human-readable name           |

Each object is identified by a **SHA-1 hash** (e.g., `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`) and stored in a **two-level folder structure** (e.g., `.git/objects/e6/9de29b...`).


##  Understanding `HEAD` in Git

You'll often hear the term `HEAD` in Git. Here's a simple way to understand it:

> **HEAD is the reference to the current branch you're on.**  
> In simple terms:  
> **"HEAD mean where me at now."**

You can view where `HEAD` is pointing using:

```bash
cat .git/HEAD
````


##  Reflog

Git keeps a log of where your `HEAD` and branch references have been. This is called the **reflog**.

You can see the reflog using:

```bash
git reflog
```

This is helpful for:

* Undoing mistakes
* Recovering deleted branches
* Finding lost commits

```





