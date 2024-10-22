import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Keep this as JS unless you convert it to TS
      nodeIntegration: true,
      contextIsolation: false, // Enable if needed
    },
  });

  win.loadURL('http://localhost:5173'); // Points to Vite dev server

  win.on('closed', () => {
    // Clean up when window is closed
    win.destroy();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On non-macOS, quit when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, reopen window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
