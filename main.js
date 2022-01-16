const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain,
  shell,
} = require("electron");
const path = require("path");
const os = require("os");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const slash = require("slash");
// const imageMozjpeg = require("imagemin-mozjpeg");

//nosso app foi construído para linux

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV === "development" ? true : false;

const linux = process.platform === "linux" ? true : false;

const isMac = process.platform === "darwin" ? true : false;

let window;

function createWindow() {
  window = new BrowserWindow({
    title: "ImageShrink",
    width: 800,
    height: 600,
    icon: `${__dirname}/assets/linux.png`,
    resizable: isDev,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadFile("./src/app/index.html");
  if (isDev) {
    window.webContents.openDevTools();
  }
}

//isso vai mostrar no console do terminal
//sempre da uma olhada la
ipcMain.on("img:submit", (event, args) => {
  args.dest = path.join(os.homedir(), "/imgShrink1398");
  handleArgs(args);
});

async function handleArgs({ dest, filePath, quality }) {
  try {
    const pngQuality = quality / 100;
    const files = await imagemin([slash(filePath)], {
      destination: dest,
      plugins: [
        imageminPngquant({
          quality: [pngQuality, pngQuality],
        }),
      ],
    });
    console.log(files);
    shell.openPath(dest);
  } catch (e) {
    console.log(e);
  }
}

let aboutWindow;

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: "About",
    resizable: false,
  });

  aboutWindow.loadFile("./src/app/about.html");
}

app.on("ready", () => {
  createWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  //garbage collection
  window.on("closed", () => (window = null));

  //e possível criar um shortcut para aplicativo
  // globalShortcut.register("CommandOrControl+Shift+I", () => {
  //   window.webContents.openDevTools();
  // });
  // globalShortcut.register("CommandOrControl+Shift+R", () => {
  //   window.reload();
  // });
});

//estou criando meu próprio menu para app
const menu = [
  //roles permite os itens do menu terem comportamentos predefinidos
  //no mac o menu nao e visível e ao clicar no ícone da aplicação
  //pode ser feche o app, então aqui esta lindo com esse problema
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

  //se for linux  ou windows
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        //accelerator é o atalho para a ação
        accelerator: "CmdOrCtrl+W",
        click: () => app.quit(), //aqui usa porque quit e uma funcao auto chamada
      },
    ],
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "toggleDevTools" },
            { role: "forceReload" },
          ],
        },
      ]
    : []),
];

//para nao fechar diretamente a tela vai ficar em background
app.on("window-all-closed", () => {
  if (!linux) {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
