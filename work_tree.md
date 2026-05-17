# 🧪 Real-world Git Worktree Example

`git worktree` dùng khi:

```txt id="1worktree"
Bạn muốn mở nhiều branch cùng lúc
MÀ không cần stash / checkout liên tục
```

---

# 🎯 Scenario thực tế

Bạn đang làm:

```txt id="2worktree"
feature/login-ui
```

Nhưng suddenly:

```txt id="3worktree"
production bug cần fix gấp
```

Thay vì:

```txt id="4worktree"
git stash
git checkout main
```

bạn có thể:

```txt id="5worktree"
mở thêm folder Git thứ 2
```

để làm hotfix song song.

Đây là sức mạnh của:

```bash id="6worktree"
git worktree
```

---

# 🔧 Full Demo

---

# 1. Create repo

```bash id="7worktree"
rm -rf git-worktree-demo

mkdir git-worktree-demo
cd git-worktree-demo

git init
```

---

# 2. Initial commit

```bash id="8worktree"
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

```bash id="9worktree"
git checkout -b feature/login-ui
```

---

# 4. Start unfinished work

```bash id="10worktree"
cat > app.js <<EOF
function login(username, password) {
    console.log("DEBUG LOGIN");

    return "login success";
}
EOF
```

---

# 📌 Important

Bạn chưa commit.

```bash id="11worktree"
git status
```

Output:

```txt id="12worktree"
modified: app.js
```

---

# 🚨 Suddenly production issue appears

Bạn cần fix trên `main`.

---

# ❌ Traditional approach

Thông thường:

```bash id="13worktree"
git stash
git checkout main
```

Rồi sau đó:

```bash id="14worktree"
git stash pop
```

---

# ✅ Better approach: worktree

---

# 5. Create another working directory

```bash id="15worktree"
git worktree add ../hotfix-worktree main
```

---

# Git làm gì?

Git tạo:

```txt id="16worktree"
another working directory
```

linked tới cùng Git repo.

---

# 📌 Bây giờ bạn có:

| Folder               | Branch             |
| -------------------- | ------------------ |
| `git-worktree-demo/` | `feature/login-ui` |
| `hotfix-worktree/`   | `main`             |

---

# 📌 Quan trọng

Bạn KHÔNG mất unfinished work.

---

# 6. Open hotfix worktree

```bash id="17worktree"
cd ../hotfix-worktree
```

---

# Check branch

```bash id="18worktree"
git branch
```

Output:

```txt id="19worktree"
* main
+ feature/login-ui
```

---

# 📌 Fix production bug

```bash id="20worktree"
cat > app.js <<EOF
function login() {
    return "hotfix applied";
}
EOF

git commit -am "B: Hotfix login API"
```

---

# 7. Return to original feature work

```bash id="21worktree"
cd ../git-worktree-demo
```

---

# 📌 Your unfinished changes are STILL there

```bash id="22worktree"
git status
```

Output:

```txt id="23worktree"
modified: app.js
```

---

# 🎉 No stash needed

Bạn có thể:

* giữ unfinished code
* fix hotfix song song
* không checkout branch liên tục

---

# 🧠 Mental Model

## `git stash`

```txt id="24worktree"
Tạm cất changes đi
```

---

## `git worktree`

```txt id="25worktree"
Mở thêm workspace khác
```

---

# Visualize

---

# Using stash

```txt id="26worktree"
Current folder
↓
save unfinished work
↓
switch branch
↓
restore work later
```

---

# Using worktree

```txt id="27worktree"
Folder 1 -> feature branch
Folder 2 -> main branch
```

song song hoàn toàn.

---

# 📦 Useful worktree commands

---

# Create worktree

```bash id="28worktree"
git worktree add ../new-folder branch-name
```

---

# List worktrees

```bash id="29worktree"
git worktree list
```

Example:

```txt id="30worktree"
/project            abc123 [feature/login-ui]
/hotfix-worktree    def456 [main]
```

---

# Remove worktree

```bash id="31worktree"
git worktree remove ../hotfix-worktree
```

---

# Prune stale worktrees

```bash id="32worktree"
git worktree prune
```

---

# ⚠️ Important Rule

Một branch:

```txt id="33worktree"
cannot be checked out
in multiple worktrees simultaneously
```

Git sẽ block.

---

# Ví dụ lỗi

Nếu:

```txt id="34worktree"
main đang mở ở hotfix-worktree
```

rồi trong folder khác:

```bash id="35worktree"
git checkout main
```

Git có thể báo:

```txt id="36worktree"
branch is already checked out
```

---

# 🔥 Real-world use cases

---

# 1. Production hotfix while feature unfinished

Most common.

---

# 2. Compare two branches side-by-side

```txt id="37worktree"
feature-v1
feature-v2
```

mở 2 IDE windows.

---

# 3. Multiple releases

```txt id="38worktree"
release/v1
release/v2
main
```

---

# 4. Large monorepo development

Không muốn:

```txt id="39worktree"
checkout + rebuild constantly
```

---

# 📊 `stash` vs `worktree`

| Feature                          | `stash` | `worktree` |
| -------------------------------- | ------- | ---------- |
| Save unfinished work             | ✅       | ❌          |
| Multiple branches simultaneously | ❌       | ✅          |
| Need checkout switching          | ✅       | ❌          |
| Good for quick temporary pause   | ✅       | ❌          |
| Good for parallel development    | ❌       | ✅          |

---

# 🧠 Easy Mental Model

## `stash`

```txt id="40worktree"
Put unfinished work into drawer
```

---

## `worktree`

```txt id="41worktree"
Open another office desk
```
