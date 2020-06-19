window.CSS.registerProperty({
  name: "--primary",
  syntax: "<color>",
  inherits: true,
  initialValue: "#ffd924",
});
window.CSS.registerProperty({
  name: "--secondary",
  syntax: "<color>",
  inherits: true,
  initialValue: "#e5961d",
});
window.CSS.registerProperty({
  name: "--tertiary",
  syntax: "<color>",
  inherits: true,
  initialValue: "#cf4310",
});
window.CSS.paintWorklet.addModule("bezel.js");

button.addEventListener("click", () => {
  updateProperties(["#71bfb1", "#5fa195", "#c55d00"]);
});

function updateProperties(colors) {
  document.body.style.setProperty("--primary", colors[0]);
  document.body.style.setProperty("--secondary", colors[1]);
  document.body.style.setProperty("--tertiary", colors[2]);
}
