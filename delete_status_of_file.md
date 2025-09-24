

## 🔹 Khi nào file có trạng thái **Deleted**?

### 1. Bạn **xóa file trong thư mục làm việc** (Working Directory)

Ví dụ:

```bash
rm tests/api/chat/reactMessage.spec.ts
git status
```

Git thấy file bị xóa nhưng chưa add → sẽ báo:

```
Changes not staged for commit:
  deleted: tests/api/chat/reactMessage.spec.ts
```

👉 Nghĩa là Git phát hiện bạn xóa file, nhưng chưa ghi nhận để commit.

---

### 2. Bạn **xóa và add vào staging**

Ví dụ:

```bash
git rm tests/api/chat/reactMessage.spec.ts
```

hoặc

```bash
rm tests/api/chat/reactMessage.spec.ts
git add tests/api/chat/reactMessage.spec.ts
```

Khi `git status`, bạn sẽ thấy:

```
Changes to be committed:
  deleted: tests/api/chat/reactMessage.spec.ts
```

👉 Nghĩa là file **sẽ bị xóa khỏi repo sau khi bạn commit**.

---

## 🔹 Cách xử lý khi lỡ tay xóa file

* **Khôi phục file chưa staged** (mới xóa trong thư mục):

  ```bash
  git restore tests/api/chat/reactMessage.spec.ts
  ```

* **Khôi phục file đã staged để xóa**:

  ```bash
  git restore --staged tests/api/chat/reactMessage.spec.ts
  git restore tests/api/chat/reactMessage.spec.ts
  ```

* **Sau khi commit nếu muốn lấy lại**:

  ```bash
  git checkout HEAD^ -- tests/api/chat/reactMessage.spec.ts
  ```

  (hoặc lấy lại từ commit cụ thể)

---

## 🔹 Tóm gọn

* `deleted (unstaged)` → bạn vừa xóa, Git chưa ghi nhận.
* `deleted (staged)` → Git đã ghi nhận xóa, commit thì file sẽ biến mất khỏi repo.

