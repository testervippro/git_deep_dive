## **1. Setup Worktree (as before)**

If the branch exists remotely:

```bash
cd /path/to/your/repo
git fetch origin
git worktree add ../feature-T02826 feature/T02826_API_Flagged_Message_List
```

Or create a new branch if it doesn’t exist:

```bash
git worktree add ../feature-T02826 -b feature/T02826_API_Flagged_Message_List main
```

---

## **2. Open the worktree in VS Code**

Navigate to your new worktree and open VS Code:

```bash
cd ../feature-T02826
code .
```

* `code .` opens the current directory in VS Code.
* VS Code **recognizes the Git repository** in this worktree.
* You now have the **feature branch loaded**, separate from your main repo directory.

---

## **3. Work on your code in VS Code**

* Make changes, e.g., editing or adding files:

```bash
echo "Testing flagged messages API" > test_flagged_message.txt
```

* Stage and commit using VS Code Git GUI or CLI:

```bash
git add test_flagged_message.txt
git commit -m "Start feature T02826 - flagged message API"
```

* Push changes to remote:

```bash
git push -u origin feature/T02826_API_Flagged_Message_List
```

---

## **4. Switch back to main repo in VS Code**

1. Open the main repo:

```bash
cd /path/to/repo
code .
```

2. You can now continue working on **main** without affecting your feature branch.

---

## **5. Tips for VS Code + Worktrees**

* VS Code **Git integration works per worktree**. Each `code .` session sees the branch in that folder.
* You can open **multiple VS Code windows**, one for each worktree, to **work on multiple branches simultaneously**.
* To avoid confusion, use **different VS Code window titles** or rename the workspace.

---

### **Example Directory Layout**

```
/path/to/repo                  -> main branch
/path/to/feature-T02826        -> feature/T02826_API_Flagged_Message_List
```

* Open `/path/to/repo` in VS Code → main branch.
* Open `/path/to/feature-T02826` in VS Code → feature branch.


