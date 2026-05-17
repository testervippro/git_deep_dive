# 🧪 Real-world Example: `merge` vs `rebase`

Scenario thực tế:

* Bạn làm feature branch
* Bạn thêm debug log
* Teammate cũng thêm đúng debug log đó vào `main`
* Sau đó bạn thử:

  * `merge`
  * `rebase`

để thấy sự khác nhau.

---

# 🔧 Setup Project

---

## 1. Tạo repo

```bash id="z3jlwm"
rm -rf git-merge-vs-rebase-demo

mkdir git-merge-vs-rebase-demo
cd git-merge-vs-rebase-demo

git init
```

---

## 2. Initial commit

```bash id="jlwm01"
cat > app.js <<EOF
function login() {
    authenticate();
}
EOF

git add .
git commit -m "A: Initial login function"
```

---

# 🌿 Create Feature Branch

```bash id="jlwm02"
git checkout -b feature/debug-login
```

---

## 3. Bạn thêm debug log

```bash id="jlwm03"
cat > app.js <<EOF
function login() {
    console.log("DEBUG LOGIN");
    authenticate();
}
EOF

git commit -am "I: Add debug log for login"
```

---

# 📌 Graph hiện tại

```txt id="jlwm04"
A --- I
```

---

# 🌳 Meanwhile on Main

---

## 4. Quay lại main

```bash id="jlwm05"
git checkout main
```

---

## 5. Teammate cũng thêm cùng debug log

```bash id="jlwm06"
cat > app.js <<EOF
function login() {
    console.log("DEBUG LOGIN");
    authenticate();
}
EOF

git commit -am "M: Add login debug log from teammate"
```

---

# 📌 Graph trước integrate

```txt id="jlwm07"
A --- M (main)
 \
  I (feature/debug-login)
```

---

# 🔍 Check Git Log

```bash id="jlwm08"
git log --oneline --graph --all --decorate
```

Expected:

```txt id="jlwm09"
* abc1234 (main) M: Add login debug log from teammate
| * def5678 (feature/debug-login) I: Add debug log for login
|/
* 1111111 A: Initial login function
```

---

# ✅ CASE 1 — MERGE

---

## 6. Merge main into feature

```bash id="jlwm10"
git checkout feature/debug-login
git merge main
```

---

# 🧠 Merge behavior

Merge:

```txt id="jlwm11"
preserves commit history
```

Git chỉ:

```txt id="jlwm12"
connect histories together
```

---

# 🔍 Git Log After Merge

```bash id="jlwm13"
git log --oneline --graph --all --decorate
```

Expected:

```txt id="jlwm14"
*   9999999 (HEAD -> feature/debug-login) Merge branch 'main'
|\
| * abc1234 (main) M: Add login debug log from teammate
* | def5678 I: Add debug log for login
|/
* 1111111 A: Initial login function
```

---

# 📌 Quan trọng

Commit:

```txt id="jlwm15"
I: Add debug log for login
```

vẫn tồn tại.

---

# 📌 Vì sao?

Vì merge:

```txt id="jlwm16"
giữ nguyên commit history
```

dù thay đổi có giống nhau.

---

# 📌 Merge Graph

```txt id="jlwm17"
A --- M -------- X
 \              /
  I ------------
```

---

# ✅ CASE 2 — REBASE

Bây giờ reset lại để demo rebase.

---

# 🔄 Reset Repository

```bash id="jlwm18"
rm -rf .git

git init
```

---

## Recreate initial commit

```bash id="’wini19"
cat > app.js <<EOF
function login() {
    authenticate();
}
EOF

git add .
git commit -m "A: Initial login function"
```

---

## Create feature branch

```bash id="’wini20"
git checkout -b feature/debug-login
```

---

## Add debug log

```bash id="’wini21"
cat > app.js <<EOF
function login() {
    console.log("DEBUG LOGIN");
    authenticate();
}
EOF

git commit -am "I: Add debug log for login"
```

---

## Back to main

```bash id="’wini22"
git checkout main
```

---

## Teammate adds same log

```bash id="’wini23"
cat > app.js <<EOF
function login() {
    console.log("DEBUG LOGIN");
    authenticate();
}
EOF

git commit -am "M: Add login debug log from teammate"
```

---

# 📌 Graph before rebase

```txt id="’wini24"
A --- M (main)
 \
  I (feature/debug-login)
```

---

# 🔥 Rebase

```bash id="’wini25"
git checkout feature/debug-login
git rebase main
```

---

# 🧠 Rebase behavior

Rebase:

```txt id="’wini26"
takes commit changes
↓
replays them
```

Patch của commit `I` là:

```diff id="’wini27"
+console.log("DEBUG LOGIN");
```

---

# Nhưng main đã có dòng đó rồi

Main hiện tại:

```javascript id="’wini28"
function login() {
    console.log("DEBUG LOGIN");
    authenticate();
}
```

---

# Patch tạo ra

```txt id="’wini29"
NO CHANGE
```

---

# Git kết luận

```txt id="’wini30"
Commit I không còn tạo thay đổi nữa
```

=> Git drop commit.

---

# 🔍 Git Log After Rebase

```bash id="’wini31"
git log --oneline --graph --all --decorate
```

Expected:

```txt id="’wini32"
* abc1234 (HEAD -> feature/debug-login, main) M: Add login debug log from teammate
* 1111111 A: Initial login function
```

---

# 📌 Quan trọng

Commit:

```txt id="’wini33"
I: Add debug log for login
```

đã biến mất.

---

# Nhưng code vẫn còn

```javascript id="’wini34"
function login() {
    console.log("DEBUG LOGIN");
    authenticate();
}
```

---

# 📌 Vì sao?

Vì:

```txt id="’wini35"
main đã có thay đổi đó rồi
```

nên commit của bạn:

```txt id="’wini36"
không còn effect
```

---

# 📊 Final Comparison

|                      | Merge    | Rebase |
| -------------------- | -------- | ------ |
| Preserve commits     | ✅ Yes    | ❌ No   |
| Replay patches       | ❌ No     | ✅ Yes  |
| Commit can disappear | ❌ No     | ✅ Yes  |
| Creates merge commit | ✅ Yes    | ❌ No   |
| History style        | Branched | Linear |

---

# 🧠 Mental Model

## Merge

```txt id="’wini37"
Giữ commit history
```

---

## Rebase

```txt id="’wini38"
Chỉ giữ thay đổi còn tác dụng
```

Nếu thay đổi:

```txt id="’wini39"
đã tồn tại rồi
```

=> commit bị drop.
