Dưới đây là **hướng dẫn nhỏ (mini-guide)** để xử lý file bị xoá nhầm trong Git từ trạng thái `git status` bạn đưa:

---

### Trạng thái hiện tại:

```
Changes to be committed:
        deleted:    utils/datas/admin/chat.ts
        modified:   utils/setup/globalSetup.ts

Untracked files:
        fixtures/admin/auth/adminApiFixture.ts
```

### Mục tiêu:

* Khôi phục file `chat.ts` bị xoá nhầm.
* Giữ các thay đổi khác sẵn sàng commit.
* Có thể thêm file untracked mới nếu muốn.

---

### Bước 1: Bỏ file khỏi staging

```bash
git restore --staged utils/datas/admin/chat.ts
```

> File `chat.ts` sẽ không còn staged (ready to commit).

---

### Bước 2: Khôi phục file từ commit trước

```bash
git checkout HEAD -- utils/datas/admin/chat.ts
```

> File `chat.ts` sẽ được lấy lại từ commit gần nhất.

---


### Bước 3: Commit các thay đổi

```bash
git commit -m "Update globalSetup and add adminApiFixture"
```

> Nếu muốn sửa commit cuối mà không đổi message, dùng `--amend --no-edit` sau khi `git add`.


