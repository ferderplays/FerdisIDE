const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    transparent: true,
    width: 200,
    height: 200,
    frame: false,
    nodeIntegration: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      allowRunningInsecureContent: true
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("app/close", () => {
  app.quit()
})

ipcMain.on("app/minimize", () => {
  mainWindow.minimize()
})

ipcMain.on("app/maximize", () => {
  mainWindow.maximize()
})

ipcMain.on("app/resize", (event,args) => {
  mainWindow.setSize(args.x, args.y, true)
})

ipcMain.on("app/opendevtools", () => {
  mainWindow.webContents.openDevTools()
})