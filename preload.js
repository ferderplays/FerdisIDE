const { contextBridge, ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

const API = {
  readFile: (filepath) => {
  },
  window: {
    close: () => ipcRenderer.send("app/close"),
    minimize: () => ipcRenderer.send("app/minimize"),
    maximize: () => ipcRenderer.send("app/maximize"),
    resize: (width, height) => ipcRenderer.send("app/resize", {x: width, y: height}),
  },
  web: {
    devtools: () => ipcRenderer.send("app/opendevtools")
  }
}

contextBridge.exposeInMainWorld("api", API)