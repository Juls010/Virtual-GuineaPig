const { app, BrowserWindow, screen} = require('electron');

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;

    const window = new BrowserWindow({
        width : width,
        height: height,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    window.loadFile("index.html");
    //window.webContents.openDevTools();
    window.setIgnoreMouseEvents(true, { forward: true });
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});