const { app, BrowserWindow, Menu } = require("electron");
//nosso app foi construído para linux
let window;

process.env.NODE_ENV = "development";

const dev = process.env.NODE_ENV === "development" ? true : false;

const linux = process.platform === "linux" ? true : false;

const isMac = process.platform === "darwin" ? true : false;

function createWindow() {
  window = new BrowserWindow({
    title: "ImageShrink",
    width: 800,
    height: 600,
    icon: `${__dirname}/assets/linux.png`,
    resizable: dev,
  });
  window.loadFile("./src/app/index.html");
}

app.on("ready", () => {
  createWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  //garbage collection
  window.on("closed", () => (window = null));
});

//estou criando meu próprio menu para app
const menu = [
  //roles permite os itens do menu terem comportamentos predefinidos
  //no mac o menu nao e visível e ao clicar no ícone da aplicação
  //pode ser feche o app, então aqui esta lindo com esse problema
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        click: () => app.quit(),
      },
    ],
  },
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
