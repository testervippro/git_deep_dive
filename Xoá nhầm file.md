

## **Mini-guide: Khôi phục file bị xóa nhầm trong Git**

### **Trạng thái ban đầu:**

```bash
git status
```

```
Changes to be committed:
        deleted:    utils/datas/admin/chat.ts
        modified:   utils/setup/globalSetup.ts

Untracked files:
        fixtures/admin/auth/adminApiFixture.ts
```

* File `chat.ts` **đang staged là xóa**.
* Các file khác vẫn staged hoặc untracked.

---

### **Mục tiêu:**

1. Khôi phục file `chat.ts` bị xóa nhầm.
2. Giữ các thay đổi khác sẵn sàng commit.
3. Có thể thêm file untracked mới nếu muốn.

---

### **Bước 1: Bỏ file khỏi staging (nếu staged là xóa)**

```bash
git restore --staged utils/datas/admin/chat.ts
```

* File `chat.ts` **không còn trong staging area**.
* File vẫn bị xóa trong working directory, nhưng commit tiếp theo **không xóa file này**.

---

### **Bước 2: Khôi phục file từ commit gần nhất**

```bash
git checkout HEAD -- utils/datas/admin/chat.ts
```

* Git **lấy lại file `chat.ts` từ commit gần nhất** (HEAD).
* File `chat.ts` xuất hiện trở lại trong thư mục làm việc với nội dung như commit trước:

```javascript
console.log('Chat module');
```

* Kiểm tra trạng thái:

```bash
git status
```

```
Changes not staged for commit:
  (none)
```

* File đã được khôi phục hoàn toàn.

---

### **Bước 3: Thêm file vào staging (nếu muốn commit)**

```bash
git add utils/datas/admin/chat.ts
```

* File đã được staged sẵn sàng commit.
* Các file khác staged hoặc untracked vẫn giữ nguyên.

---

### **Bước 4: Commit các thay đổi**

```bash
git commit -m "Restore chat.ts and update globalSetup"
```

> Nếu muốn sửa commit cuối cùng mà **không đổi message**, dùng:

```bash
git commit --amend --no-edit
```

---

### **Tóm tắt thứ tự lệnh Git quan trọng**

```bash
# 1️⃣ Bỏ khỏi staging nếu staged xóa
git restore --staged utils/datas/admin/chat.ts

# 2️⃣ Khôi phục file từ commit gần nhất
git checkout HEAD -- utils/datas/admin/chat.ts

# 3️⃣ Thêm file vào staging
git add utils/datas/admin/chat.ts

# 4️⃣ Commit các thay đổi
git commit -m "Restore chat.ts and update globalSetup"
```

---

Nếu muốn, mình có thể vẽ **sơ đồ workflow trực quan**, hiển thị trạng thái **working directory + staging area** trước và sau mỗi bước, giúp dễ hình dung hơn.

Bạn có muốn mình vẽ sơ đồ không?
