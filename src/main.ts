import { app, BrowserWindow, Tray, nativeImage, Menu } from "electron";
import path from "path";

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;

// ── Tạo popup window ──────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.on("blur", () => {
    mainWindow?.hide();
  });
}

// ── Tạo Tray icon ─────────────────────────────────────────

function showPopup() {
  const { x, y } = tray.getBounds();
  const { width, height } = mainWindow.getBounds();

  /*
             x
             ↓
    menubar: █ ← icon (rộng ~22px)
             ↓ y + 20
          [     popup (rộng 400px)G     ]
          ↑
          x - (400/2) = x - 200
  */
  mainWindow.setPosition(Math.round(x - width / 2), Math.round(y + 20));

  mainWindow.show();
}

function createTray() {
  // Xử lý ảnh native theo từng OS
  const iconPath = path.join(__dirname, "../../assets/iconTemplate.png");
  const icon = nativeImage.createFromPath(iconPath);

  tray = new Tray(icon);
  tray.setToolTip("MenuBar Note");

  tray.on("click", () => {
    if (!mainWindow) return;

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      showPopup();
    }
  });

  // Right-click → hiện menu có Quit
  tray.on("right-click", () => {
    const contextMenu = Menu.buildFromTemplate([
      { label: "MenuBar Note", enabled: false },
      { type: "separator" },
      {
        label: "Quit",
        click: () => {
          app.quit(); // gọi thẳng app.quit() để thoát thật sự
        },
      },
    ]);
    tray.popUpContextMenu(contextMenu);
  });
}

// ── App lifecycle ──────────────────────────────────────────

app.whenReady().then(() => {
  if (process.platform === "darwin") {
    app.dock.hide();
  }

  createWindow();
  createTray();
});

app.on("window-all-closed", () => {});
