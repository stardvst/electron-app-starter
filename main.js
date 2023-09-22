const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // windows cannot be created before the ready event
  // listen for activate events after your app is initialized
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      // macOS apps generally continue running even without any windows open
      // Activating the app when no windows are available should open a new one
      createWindow()
    }
  })
})

// Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
  // exit app if the user is not on macOS
  if(process.platform !== 'darwin') {
    app.quit()
  }
})
