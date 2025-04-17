import { showMessage } from "./message.js";
import "./styles.css";
import logo from "./logo.png";
import { usedFunction } from "./util.js";

showMessage("Webpack works!");
usedFunction();

const img = document.createElement("img");
img.src = logo;
img.alt = "logo";
document.body.appendChild(img);

const btn = document.createElement("button");
btn.innerText = "Load Feature";
btn.onclick = () => {
  import("./feature.js").then((mod) => mod.feature());
};
document.body.appendChild(btn);
