const os = require("os");
const path = require("path");
const { ipcRenderer } = require("electron");

//https://ichi.pro/pt/6-modulos-internos-uteis-do-node-js-197313155418265
// comando os  retorna um objeto com informações sobre o sistema operacional
const span = document.getElementById("output-path");
span.innerHTML = path.join(os.homedir(), "/imgShrink1398");

const form = document.getElementById("image-form");
const file = document.getElementById("img");
const slider = document.getElementById("slider");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const filePath = file.files[0].path;
  const quality = slider.value;
  //primeiro argumento do ipcRender e o nome do evento
  //sera o mesmo nome la no ipcMain
  ipcRenderer.send("img:submit", {
    filePath,
    quality,
  });
});

ipcRenderer.on("img:done", () => {
  //e do materalize
  M.toast({
    html: `Image resized with success!Resize to ${slider.value}%`,
  });
});
