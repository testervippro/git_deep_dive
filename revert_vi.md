# 🧪 Real-world Example: `git revert`

Scenario thực tế:

* Bạn push một bug lên `main`
* Team đã pull code rồi
* Bạn cần undo bug
* Nhưng KHÔNG được rewrite history

=> dùng:

```bash id="9kwjlwm"
git revert
```

---

# 🎯 Situation

Bạn đang làm API login.

---

# 1. Tạo project

```bash id="1kwjlwm"
rm -rf git-revert-realworld

mkdir git-revert-realworld
cd git-revert-realworld

git init
```

---

# 2. Initial working login API

```bash id="2kwjlwm"
cat > app.js <<EOF
function login() {
    return "Login success";
}
EOF

git add .
git commit -m "A: Add login API"
```

---

# 3. Add validation

```bash id="3kwjlwm"
cat > app.js <<EOF
function login(username) {
    if (!username) {
        return "Username required";
    }

    return "Login success";
}
EOF

git commit -am "B: Add username validation"
```

---

# 4. Bad commit introduced

Bạn accidentally break API.

```bash id="4kwjlwm"
cat > app.js <<EOF
function login(username) {
    throw new Error("Production crash");
}
EOF

git commit -am "C: Break login API"
```

---

# 📌 File hiện tại

```bash id="5kwjlwm"
cat app.js
```

Output:

```javascript id="6kwjlwm"
function login(username) {
    throw new Error("Production crash");
}
```

---

# 📌 Git log

```bash id="7kwjlwm"
git log --oneline --graph
```

Expected:

```txt id="8kwjlwm"
* c333333 C: Break login API
* b222222 B: Add username validation
* a111111 A: Add login API
```

---

# 🚨 Problem thực tế

Bug đã được push lên remote.

Team đã pull rồi.

Bạn KHÔNG nên:

```bash id="10kwjlwm"
git reset --hard HEAD~1
git push --force
```

vì:

```txt id="11kwjlwm"
rewrite history
```

sẽ phá branch của người khác.

---

# ✅ Correct Solution: Revert

```bash id="12kw-vesm"
git revert HEAD --no-edit
```

---

# Git internally làm gì?

Commit C có patch:

```diff id="13kw-vesm"
- return "Login success";
+ throw new Error("Production crash");
```

---

# Git tạo reverse patch

```diff id="14kw-vesm"
- throw new Error("Production crash");
+ return "Login success";
```

---

# Và tạo commit mới

```txt id="15kw-vesm"
Revert "C: Break login API"
```

---

# 📌 Check file sau revert

```bash id="16kw-vesm"
cat app.js
```

Output:

```javascript id="17kw-vesm"
function login(username) {
    if (!username) {
        return "Username required";
    }

    return "Login success";
}
```

---

# 📌 Bug đã biến mất

NHƯNG:

```txt id="18kw-vesm"
history vẫn còn nguyên
```

---

# 📌 Git log sau revert

```bash id="19kw-vesm"
git log --oneline --graph
```

Expected:

```txt id="20kw-vesm"
* d444444 Revert "C: Break login API"
* c333333 C: Break login API
* b222222 B: Add username validation
* a111111 A: Add login API
```

---

# 🧠 Quan trọng

Bad commit:

```txt id="21kw-vesm"
C: Break login API
```

vẫn tồn tại.

---

# Nhưng effect của nó bị đảo ngược bởi:

```txt id="22kw-vesm"
Revert "C: Break login API"
```

---

# 📌 Graph thực tế

Before:

```txt id="23kw-vesm"
A --- B --- C
```

After revert:

```txt id="24kw-vesm"
A --- B --- C --- R
```

`R` = revert commit.

---

# 🧠 Mental Model

## `git revert`

```txt id="25kw-vesm"
"Tạo commit mới để undo commit cũ"
```

---

# So sánh với `reset`

---

# `git reset --hard HEAD~1`

Sau reset:

```txt id="26kw-vesm"
A --- B
```

Commit C biến mất khỏi current history.

---

# `git revert HEAD`

Sau revert:

```txt id="27kw-vesm"
A --- B --- C --- R
```

History preserved.

---

# 📌 Khi nào dùng revert?

## Dùng revert khi:

✅ commit đã push
✅ shared branch
✅ team collaboration
✅ production hotfix

---

# 📌 Khi nào dùng reset?

## Dùng reset khi:

✅ local branch
✅ chưa push
✅ cleanup local history

---

# 🔥 Bonus: Revert old commit

Ví dụ history:

```txt id="28kw-vesm"
A --- B --- C --- D
```

---

# Revert commit B

```bash id="29kw-vesm"
git revert <hash-of-B>
```

Git sẽ:

```txt id="30kw-vesm"
undo changes introduced by B
```

trên code hiện tại.

---

# 📌 Có thể conflict

Vì:

```txt id="31kw-vesm"
code hiện tại khác xa thời điểm B
```

---

# Một câu cực kỳ quan trọng

## `reset`

```txt id="32kw-vesm"
rewrite history
```

---

## `revert`

```txt id="33kw-vesm"
append undo history
```

Đây là khác biệt cốt lõi.
