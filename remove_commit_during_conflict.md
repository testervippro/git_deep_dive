# Ví dụ thực tế: Commit bị drop khi rebase

Đây là case cực phổ biến trong team development.

---

# 🎯 Scenario

Bạn đang làm feature branch.

Bạn thêm một dòng debug:

```javascript id="fd7gqv"
console.log("DEBUG");
```

Sau đó bạn commit.

---

# Branch của bạn

## Commit I

```txt id="9llp34"
I: Add debug log
```

Code:

```javascript id="9pkxqm"
function login() {
    console.log("DEBUG");
    authenticate();
}
```

Patch của commit I:

```diff id="uj2p92"
+console.log("DEBUG");
```

---

# Meanwhile trên main branch

Tech lead review code và cũng thêm cùng dòng đó.

Main hiện tại:

```javascript id="8v7p50"
function login() {
    console.log("DEBUG");
    authenticate();
}
```

---

# Git graph trước rebase

```txt id="j0mkjg"
A --- M (main)
 \
  I (feature)
```

---

# Bạn chạy rebase

```bash id="i3m9y5"
git checkout feature
git rebase main
```

---

# Git làm gì internally?

Git lấy patch của commit I:

```diff id="vxcbmn"
+console.log("DEBUG");
```

rồi apply lên `main`.

---

# Nhưng main đã có dòng đó rồi

Nên apply patch tạo ra:

```txt id="6hj52q"
NO CHANGE
```

---

# Git kết luận

```txt id="w97qvs"
Commit I không còn tác dụng nữa
```

=> Git drop commit.

---

# Sau rebase

Graph:

```txt id="otlxys"
A --- M
```

Commit:

```txt id="ck34up"
I: Add debug log
```

biến mất.

---

# Nhưng code vẫn còn

Đây là phần nhiều người bị confuse.

## Commit biến mất

NHƯNG:

```javascript id="tnad12"
console.log("DEBUG");
```

vẫn tồn tại trong codebase.

Vì:

```txt id="v7b0zs"
main đã có thay đổi đó rồi
```

---

# Real-world situation #2

---

# Feature branch

Bạn fix bug:

```txt id="cgmbdo"
remove null pointer check
```

Commit:

```txt id="4w1d2y"
I: Fix null pointer bug
```

---

# Nhưng team khác đã fix rồi trên main

Main đã có đúng fix đó.

---

# Khi rebase

Git thử replay patch:

```diff id="0q8j26"
+if (user != null)
```

Nhưng code đã có.

=> patch becomes empty.

=> commit bị drop.

---

# Real-world situation #3

---

# Feature branch

Bạn xóa:

```javascript id="nfd2lj"
console.log("temp");
```

---

# Main branch

Người khác cũng xóa dòng đó.

---

# Rebase

Git thử xóa tiếp.

Nhưng:

```txt id="r9u6h2"
dòng đã không còn
```

=> no-op patch.

=> commit dropped.

---

# Cực kỳ phổ biến trong:

* cleanup commits
* debug commits
* formatting commits
* lint fixes
* hotfixes
* cherry-picks
* duplicated work giữa team members

---

# Điều quan trọng cần hiểu

## Rebase quan tâm:

```txt id="9nq8my"
thay đổi cuối cùng
```

KHÔNG quan tâm:

```txt id="1whzwx"
commit có từng tồn tại hay không
```

---

# Mental model thực tế

Git hỏi:

```txt id="t2gmx9"
Nếu replay commit này,
code có thay đổi không?
```

---

## Nếu có

```txt id="87mxj9"
→ tạo commit mới
```

---

## Nếu không

```txt id="z0z57j"
→ bỏ commit
```

---

# Một câu rất quan trọng

## Rebase replay CHANGES

không replay:

```txt id="rmz8l2"
commit identity
```

Đây là lý do commit có thể biến mất sau rebase.
