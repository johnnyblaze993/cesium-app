import { app, BrowserWindow } from 'electron';

// Disable GPU hardware acceleration
app.commandLine.appendSwitch('disable-gpu');

function createWindow() {
    const win = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.loadURL('http://localhost:5173'); // Points to Vite dev server

    win.on('closed', () => {
      win.destroy();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
