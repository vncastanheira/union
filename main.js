const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// User configurations
const Config = require('electron-config');

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray
let userconfig

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 600,
    minHeight: 150,
    fullscreenable: false,
    resizable: false,
    title: 'Union',
    titleBarStyle: 'hidden',
    frame: true
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Create the tray
  tray = new electron.Tray(__dirname + '/icon.ico')
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  mainWindow.on('minimize', mainWindow.hide)
  mainWindow.on('hide', () => {
    tray.displayBalloon({
      title: "Union",
      content: "App is still running on the tray."
    });
  })
}

const shouldQuit = app.makeSingleInstance((cmd, workingDirectory) => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
})

if (shouldQuit)
  app.quit();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
    BrowserWindow.addDevToolsExtension("C:\Users\vinic\AppData\Local\Google\Chrome\User Data\Default\Extensions\fmkadmapgofadopljbjfkapdkoienihi\2.1.3_0")
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
