# Vì sao `git reset + push --force` có thể phá branch của người khác?

Đây là một trong những vấn đề nguy hiểm nhất khi dùng Git trong team.

---

# 🎯 Scenario thực tế

Có 2 người:

* Bạn
* Teammate

Cùng làm trên branch:

```txt id="4tjlwm"
main
```

---

# Ban đầu

Remote:

```txt id="5tjlwm"
A --- B --- C
```

Trong đó:

```txt id="6tjlwm"
C = bad commit
```

---

# Cả team đã pull commit C

Teammate local:

```txt id="7tjlwm"
A --- B --- C
```

---

# Nhưng bạn muốn xóa commit C

Bạn làm:

```bash id="8tjlwm"
git reset --hard HEAD~1
```

---

# Local của bạn thành

```txt id="9tjlwm"
A --- B
```

Commit `C` biến mất khỏi branch hiện tại.

---

# Nhưng remote vẫn là

```txt id="10tjlwm"
A --- B --- C
```

---

# Bạn push bình thường

```bash id="11tjlwm"
git push
```

Git sẽ từ chối.

---

# Vì sao?

Git thấy:

```txt id="12tjlwm"
remote có commit mà local không có
```

---

# Git bảo vệ history

Nên báo kiểu:

```txt id="13tjlwm"
non-fast-forward update rejected
```

---

# Bạn force push

```bash id="14tjlwm"
git push --force
```

---

# Điều gì xảy ra?

Remote bị rewrite thành:

```txt id="15tjlwm"
A --- B
```

Commit `C` bị xóa khỏi remote history.

---

# 🚨 Nhưng teammate thì sao?

Teammate local vẫn là:

```txt id="16tjlwm"
A --- B --- C
```

---

# Và teammate tiếp tục làm việc

Teammate commit thêm:

```txt id="17tjlwm"
D
```

Graph:

```txt id="18tjlwm"
A --- B --- C --- D
```

---

# Teammate push

```bash id="19tjlwm"
git push
```

---

# Git bây giờ thấy gì?

---

## Remote

```txt id="20tjlwm"
A --- B
```

---

## Teammate local

```txt id="21tjlwm"
A --- B --- C --- D
```

---

# Git confused

Vì:

```txt id="22tjlwm"
history đã bị rewrite
```

---

# Các vấn đề xảy ra

---

# 1. Push bị reject

Git thường báo:

```txt id="23t’wini"
failed to push some refs
```

---

# 2. Teammate phải pull/rebase/reset thủ công

Rất messy.

---

# 3. Commit cũ có thể reappear

Nếu teammate force push ngược lại:

```txt id="24t’wini"
C có thể quay trở lại
```

---

# 4. Branch history bị divergent

```txt id="25t’wini"
2 histories khác nhau
```

---

# Visualize

---

# BEFORE force push

Remote + teammate:

```txt id="26t’wini"
A --- B --- C
```

---

# AFTER bạn force push

Remote:

```txt id="27t’wini"
A --- B
```

---

# Nhưng teammate local

vẫn:

```txt id="28t’wini"
A --- B --- C
```

---

# Histories diverged

---

# Đây là lý do dangerous

Force push:

```txt id="29t’wini"
rewrite shared history
```

---

# Tại sao revert an toàn hơn?

---

# Nếu dùng revert

```bash id="30t’wini"
git revert C
```

---

# Remote thành

```txt id="31t’wini"
A --- B --- C --- R
```

---

# Không rewrite history

Mọi người đều thấy:

* C tồn tại
* R undo C

---

# Teammate pull bình thường

Không conflict lịch sử.

---

# Đây là lý do rule phổ biến

## Shared/public branch

Dùng:

```txt id="32t’wini"
git revert
```

---

## Local/private branch

Có thể dùng:

```txt id="33t’wini"
git reset
git rebase
git push --force
```

---

# Mental Model cực quan trọng

---

# `reset --hard`

```txt id="34t’wini"
"Tôi muốn timeline mới"
```

---

# `push --force`

```txt id="35t’wini"
"Mọi người phải dùng timeline mới của tôi"
```

---

# Nếu người khác đang dùng timeline cũ

=> chaos.

---

# Một ví dụ cực thực tế

---

# Team shared branch

```txt id="36t’wini"
feature/payment
```

---

# Bạn force push

Xóa:

```txt id="37t’wini"
commit C
```

---

# Teammate đang làm trên C

Commit mới:

```txt id="38t’wini"
D
E
F
```

---

# Sau force push

Teammate phải:

* reset branch
* cherry-pick commits
* rebase lại
* resolve conflicts

Rất tốn thời gian.

---

# Đây là lý do nhiều company cấm:

```txt id="39t’wini"
force push on main
```

---

# GitHub/GitLab thường protect branch

Để chặn:

```txt id="40t’wini"
git push --force
```

trên:

* `main`
* `master`
* `release/*`

---

# Một câu cực dễ nhớ

## `revert`

```txt id="41t’wini"
Add history
```

---

## `reset + force push`

```txt id="42t’wini"
Rewrite shared reality
```
