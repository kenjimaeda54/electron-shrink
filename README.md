# Shrink
Aplicativo em desktop usando Electron

## Motivacao 
Aprender usar electron para construcao de aplicativos destkop</br>
Shirink e aplicativo que reduz o tamanho de uma imagem

## Feature

- Electron possui recurso de enviar eventos ao longo da aplicação usando ipcMain e ipcRenrender
- Para aplacação entender precisa de uma chave, apos esta chave pode suar um objeto ou array com argumentos
- Electron usa os recursos do javascript e html para construção de seus app
- Com js podemos pegar facilmente atrelar eventos, id, seletores do html
- Também posso usar os módulos padrões do javascript

``` javascript
// index js
const os = require("os");
const path = require("path");
const { ipcRenderer } = require("electron");



const form = document.getElementById("image-form");
const file = document.getElementById("img");
const slider = document.getElementById("slider");
ipcRenderer.send("img:submit", {
    filePath,
    quality,
  });
});


//main js

ipcMain.on("img:submit", (event, args) => {
  args.dest = path.join(os.homedir(), "/imgShrink1398");
  handleArgs(args);
});

```
##

- Contruí meus próprios menus e lidei com o menu do Mac
- Mac possui menus bem diferentes dos padrões em linux e windows
- Com process consigo capturar a plataforma atual, nesse caso estou comparando se e linux
- Electron já disponibiliza alguns, short curt. Para usarmos nos menus



``` javascript
 //e possível criar um shortcut para aplicativo
 globalShortcut.register("CommandOrControl+Shift+I", () => {
     window.webContents.openDevTools();
   });
   globalShortcut.register("CommandOrControl+Shift+R", () => {
     window.reload();
  });


const isMac = process.platform === "darwin" ? true : false;
...(isMac
    ? [
        { role: "appMenu" },
        {
          label: app.name,
          submenu: [
            {
              role: "about",
              click: createAboutWindow, // aqui nao usa uma funcao anonima ()=>
            },
          ],
        },
      ]
    : [
        {
          label: "Help",
          submenu: [
            {
              label: "about",
              click: createAboutWindow, // aqui nao usa uma funcao anonima ()=>
            },
          ],
        },
      ]),


```

##

- Para realizar o build do aplicativo em windows precisou configuracao extra
- Usei o electron-builder
- Precisa da versao do app,productName,apontar a entrada do aplicativo no packjson(chave main)
- E criar um script de build
- Para buildar eu usei apenas depois o npm run builder-installer
- Apos tudo certo vai estar liberado na dist o executor

``` json

"build": {
    "appId": "cool-app",
    "win": {
      "target": [
        "nsis"
      ],
      "icon": "assets/win/icon.ico",
      "requestedExecutionLevel": "requireAdministrator"
    },
    "nsis": {
      "installerIcon": "assets/win/icon.ico",
      "uninstallerIcon": "assets/win/icon.ico",
      "uninstallDisplayName": "ImageShrink",
      "license": "license.txt",
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  },


```













