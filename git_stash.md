# 🧪 Real-world Git Stash Example

`git stash` dùng khi:

```txt id="1stash"
Bạn đang làm dở
NHƯNG cần chuyển branch / pull code / fix urgent bug
```

Mà chưa muốn commit.

---

# 🎯 Scenario thực tế

Bạn đang làm feature login.

Chưa code xong.

Suddenly:

```txt id="2stash"
Production bug cần fix gấp
```

Bạn cần:

* tạm cất changes hiện tại
* switch branch
* fix bug
* quay lại tiếp tục work

=> dùng:

```bash id="3stash"
git stash
```

---

# 🔧 Full Demo

---

# 1. Create repo

```bash id="4stash"
rm -rf git-stash-demo

mkdir git-stash-demo
cd git-stash-demo

git init
```

---

# 2. Initial commit

```bash id="5stash"
cat > app.js <<EOF
function login() {
    return "login success";
}
EOF

git add .
git commit -m "A: Initial login API"
```

---

# 3. Create feature branch

```bash id="6stash"
git checkout -b feature/login-ui
```

---

# 4. Work in progress (NOT finished yet)

```bash id="7stash"
cat > app.js <<EOF
function login(username, password) {
    console.log("DEBUG LOGIN");

    return "login success";
}
EOF
```

---

# 📌 Check status

```bash id="8stash"
git status
```

Output:

```txt id="9stash"
modified: app.js
```

---

# 🚨 Suddenly production bug appears

Bạn cần quay về `main`.

Nhưng:

```txt id="10stash"
changes chưa commit
```

---

# ❌ Nếu checkout luôn

```bash id="11stash"
git checkout main
```

Có thể:

* conflict
* dirty working tree
* unfinished code bị ảnh hưởng

---

# ✅ Correct solution: stash

```bash id="12stash"
git stash
```

---

# Git làm gì?

Git:

```txt id="13stash"
save current changes temporarily
↓
clean working directory
```

---

# 📌 Check status

```bash id="14stash"
git status
```

Output:

```txt id="15stash"
nothing to commit, working tree clean
```

---

# 📌 File reverted về commit gần nhất

```bash id="16stash"
cat app.js
```

Output:

```javascript id="17stash"
function login() {
    return "login success";
}
```

---

# 🧠 Quan trọng

Code chưa mất.

Git chỉ:

```txt id="18stash"
cất tạm vào stash stack
```

---

# 5. Fix urgent production bug

```bash id="19stash"
git checkout main
```

---

# Fix bug

```bash id="20stash"
cat > app.js <<EOF
function login() {
    return "hotfix applied";
}
EOF

git commit -am "B: Hotfix login API"
```

---

# 6. Quay lại feature branch

```bash id="21stash"
git checkout feature/login-ui
```

---

# 7. Restore stashed changes

```bash id="22stash"
git stash pop
```

---

# Git làm gì?

Git:

```txt id="23stash"
restore saved changes
↓
remove stash entry
```

---

# 📌 File quay lại

```bash id="24stash"
cat app.js
```

Output:

```javascript id="25stash"
function login(username, password) {
    console.log("DEBUG LOGIN");

    return "login success";
}
```

---

# 🎉 Bạn tiếp tục coding

Không mất work-in-progress.

---

# 🧠 Mental Model

## `git stash`

```txt id="26stash"
"Tạm cất code chưa commit"
```

---

# Visualize

---

# BEFORE stash

Working tree:

```txt id="27stash"
modified files
```

---

# AFTER stash

Working tree:

```txt id="28stash"
clean
```

Stash storage:

```txt id="29stash"
saved changes
```

---

# AFTER stash pop

Working tree:

```txt id="30stash"
changes restored
```

---

# 📦 Useful stash commands

---

# Create stash

```bash id="31stash"
git stash
```

---

# Named stash

```bash id="32stash"
git stash push -m "WIP login UI"
```

---

# List stashes

```bash id="33stash"
git stash list
```

Example:

```txt id="34stash"
stash@{0}: WIP on feature/login-ui
stash@{1}: WIP payment page
```

---

# Apply stash (KEEP stash)

```bash id="35stash"
git stash apply
```

---

# Pop stash (apply + remove)

```bash id="36stash"
git stash pop
```

---

# Drop stash manually

```bash id="37stash"
git stash drop stash@{0}
```

---

# Clear all stash

```bash id="38stash"
git stash clear
```

---

# 📌 `apply` vs `pop`

| Command | Restore changes | Remove stash |
| ------- | --------------- | ------------ |
| `apply` | ✅               | ❌            |
| `pop`   | ✅               | ✅            |

---

# 🔥 Real-world common use cases

---

# 1. Pull latest code

```bash id="39stash"
git stash
git pull
git stash pop
```

---

# 2. Switch branch quickly

```bash id="40stash"
git stash
git checkout main
```

---

# 3. Temporary experiment

```bash id="41stash"
git stash
```

---

# 4. Save unfinished work without dirty commits

Instead of:

```txt id="42stash"
WIP
temp
fix later
```

commit spam.

Use:

```bash id="43stash"
git stash
```

---

# ⚠️ Important

`stash`:

```txt id="44stash"
KHÔNG phải backup lâu dài
```

Nó là:

```txt id="45stash"
temporary storage
```

---

# Một câu cực dễ nhớ

## `git stash`

```txt id="46stash"
"Put unfinished work into a temporary drawer"
```
