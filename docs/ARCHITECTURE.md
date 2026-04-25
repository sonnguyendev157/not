<!-- Ghi lại tại sao chọn cái này thay vì cái kia, để sau 2 tuần không phải tự hỏi lại: -->
<!---->
<!-- Tại sao Electron (không phải Tauri)? -->
<!-- Tại sao CodeMirror 6 (không phải Monaco)? -->
<!-- IPC flow giữa main ↔ preload ↔ renderer trông như thế nào? -->
<!-- Data flow: gõ → debounce → fs.writeFile → tên file lấy từ dòng đầu -->
<!---->
<!-- Vẽ thêm một sơ đồ đơn giản là đủ. -->

##  User flow

[User click Tray icon]
        ↓
   main.ts toggle BrowserWindow.show/hide()
        ↓
   [Popup hiện ra - renderer/index.html]
        ↓
   User gõ text vào CodeMirror editor
        ↓
   Debounce 500ms → renderer gọi window.electronAPI.saveNote(content)
        ↓
   preload.ts chuyển tiếp → ipcRenderer.invoke('save-note', content)
        ↓
   main.ts nhận → ipcMain.handle('save-note') → fs.writeFile(...)
        ↓
   File .md được lưu vào thư mục đã chọn
