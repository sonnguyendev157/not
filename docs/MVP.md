# MVP

## MVP cho MenuBar Note App

### 🗂️ Core Features

| Tính năng | Chi tiết |
|---|---|
| **Menubar icon** | Click để toggle popup |
| **Editor markdown** | Textarea đơn giản, hỗ trợ syntax highlighting |
| **Auto-save** | Lưu tự động khi gõ (debounce ~500ms) |
| **Chọn thư mục lưu** | Một lần setup trong Settings |
| **Mỗi note = 1 file .md** | Tên file = dòng đầu tiên |

### ❌ Chưa cần làm ở MVP
- Render preview markdown (chỉ cần viết được)
- Tìm kiếm
- Tags / folder lồng nhau
- Sync cloud
- Shortcut global (Cmd+Shift+N)

---

### 🏗️ Tech Stack

```
Electron + TypeScript
├── electron-builder      → đóng gói .dmg
├── CodeMirror6           → editor nhẹ có markdown highlight
└── fs (Node built-in)    → đọc/ghi file .md
```
---

### 📁 Cấu trúc file gợi ý

```
/
├── main.ts          → Tray icon, BrowserWindow, IPC
├── preload.ts       → Bridge giữa renderer & Node
├── renderer/
│   ├── index.html
│   ├── editor.ts    → Logic viết, auto-save
│   └── style.css
└── notes/           → Default dir lưu note (user có thể đổi)
```

---

### 🔄 User Flow (happy path)

```
Click icon menubar
  → Popup hiện ra, focus vào editor
  → Gõ note (markdown)
  → Auto-save sau 500ms → lưu file .md vào thư mục đã chọn
  → Click ngoài → popup ẩn
```

---

### ✅ Definition of Done cho MVP

- [ ] Popup hiện/ẩn khi click menubar icon
- [ ] Gõ được markdown, auto-save
- [ ] File `.md` xuất hiện đúng trong thư mục đã chọn
- [ ] Chọn được thư mục lưu qua dialog
- [ ] App chạy khi máy khởi động (Launch at Login)
- [ ] Build được file `.dmg` cài được trên máy khác

---

### ⏱️ Ước tính thời gian

| Giai đoạn | Thời gian |
|---|---|
| Setup Electron + Tray + Popup | 1–2 ngày |
| Editor + Auto-save + File I/O | 2–3 ngày |
| Chọn thư mục + Settings | 1 ngày |
| Polish UI + build .dmg | 1–2 ngày |
| **Tổng** | **~1 tuần** |

---

### 🔗 Link tham khảo

- [electron](https://www.electronjs.org/docs/latest/) 
- [codemirror](https://codemirror.net/) 

