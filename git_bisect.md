Sure! Here's the **full `git bisect` automation example**, **rewritten so you can copy-paste and run it entirely from your terminal** — no need to create a separate script file.

We simulate a repo where one commit introduces a bug (`BUGGY`), and then we use `git bisect run` to find it — **all via the command line**.

---

### 🧪 FULL WORKING EXAMPLE — JUST RUN IN CMD

```bash
# STEP 0: Create a fresh repo to simulate
mkdir bisect-demo && cd bisect-demo
git init

# STEP 1: Create a good commit
echo "Version 1" > app.txt
git add app.txt
git commit -m "Initial good version"

# STEP 2: Make a few good commits
echo "Version 2" >> app.txt
git commit -am "Update to version 2"

echo "Version 3" >> app.txt
git commit -am "Update to version 3"

# STEP 3: Introduce the bug
echo "BUGGY line here" >> app.txt
git commit -am "Introduce buggy code"

# STEP 4: Add more commits after the bug
echo "Version 5" >> app.txt
git commit -am "Update to version 5"

# STEP 5: Start bisect session
git bisect start

# STEP 6: Mark current commit as bad
git bisect bad

# STEP 7: Mark initial commit as good
git bisect good HEAD~4

# STEP 8: Run bisect with inline test (searching for "BUGGY" line)
git bisect run bash -c '! grep -q BUGGY app.txt'
```

---

### 🧾 Output You'll See:

Git will checkout each commit and run the command:

```
running bash -c ! grep -q BUGGY app.txt
✅ exit code 0 (good) or ❌ exit code 1 (bad)
```

Eventually:

```
<commit_hash> is the first bad commit
commit Introduce buggy code
```

---

### ✅ Clean up:

```bash
git bisect reset
```

---

This way, **everything runs inline on your command line**, without needing a separate test file. Let me know if you'd like a version that runs with Python or in a real test suite.
