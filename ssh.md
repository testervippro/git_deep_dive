
## ✅ Goal

You want to:

```bash
git clone git@github.com:testervippro/git_deep_dive.git
```

using **SSH authentication** via **Git Bash**.

---

## 🔧 Step-by-Step SSH Setup and Example (in Git Bash)

### 📍 1. Open Git Bash

On Windows, right-click desktop → **Git Bash Here**
Or search **Git Bash** in Start menu.

---

### 🔑 2. Check for existing SSH keys

```bash
ls -al ~/.ssh
```

Look for:

* `id_rsa` and `id_rsa.pub` (default key)
* or `id_ed25519` and `id_ed25519.pub`

If found, skip to step 4.

---

### 🛠️ 3. Generate a new SSH key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

If your GitHub doesn't support ed25519 (rare), use:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

When prompted:

```bash
Enter file in which to save the key (/c/Users/YOU/.ssh/id_ed25519): [Press Enter]
Enter passphrase (optional): [Enter or set password]
```

✅ This creates:

* Private key: `~/.ssh/id_ed25519`
* Public key: `~/.ssh/id_ed25519.pub`

---

### 📋 4. Copy SSH public key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire output. Example:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID1234567890yourkeyhere your_email@example.com
```

---

### 🔐 5. Add SSH key to GitHub

1. Go to [https://github.com/settings/ssh](https://github.com/settings/ssh)
2. Click **New SSH key**
3. Title: e.g., “Git Bash on Windows”
4. Paste your copied key → Click **Add SSH key**

---

### 🚀 6. Test SSH connection

```bash
ssh -T git@github.com
```

First time, you'll see:

```
The authenticity of host 'github.com' can't be established...
Are you sure you want to continue connecting (yes/no)? yes
```

Then:

```
Hi testervippro! You've successfully authenticated, but GitHub does not provide shell access.
```

---



