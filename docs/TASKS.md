## Milestone 1: Skeleton chạy được
- [x] Init Electron + TypeScript
- [x] Tray icon hiện trên menubar
- [x] BrowserWindow toggle show/hide khi click

## Milestone 2: Editor hoạt động
- [x] Nhúng CodeMirror6 vào renderer
- [x] Markdown syntax highlighting
- [ ] Auto-save debounce 500ms → fs.writeFile

## Milestone 3: File management
- [ ] Tên file = dòng đầu tiên (sanitize ký tự đặc biệt)
- [ ] Dialog chọn thư mục lưu
- [ ] Persist thư mục đã chọn (electron-store)

## Milestone 4: Polish & Ship
- [ ] Launch at Login
- [ ] App ẩn khi click ngoài (blur event)
- [ ] Build .dmg với electron-builder
- [ ] Test cài trên máy sạch
