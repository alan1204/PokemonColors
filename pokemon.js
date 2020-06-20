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

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(form);
  const id = data.get("id");
  const pokemon = await getPokemon(id);
  console.log(pokemon);
  const pokemonDrawed = await renderPokemon(pokemon);
  const colors = draw.colorPalette(90);
  updateProperties(colors);
}

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();
  return pokemon;
}

/*const ctx = canvas.getContext("2d");
const image = new Image();
image.setAttribute("crossOrigin", "anonymus");*/

class Draw {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.setAttribute("crossOrigin", "anonymous");
  }
  render(url) {
    this.image.setAttribute("src", url);
    this.ctx.font = "20px sans-serif";
    this.ctx.textBaseline = "top";
    this.ctx.fillText("Loading...", 0, 0, canvas.width);
    return new Promise((resolve, reject) => {
      this.image.addEventListener("load", () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
          this.image,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
        resolve("listo para obtener colores");
        //const colors = this.colorPalette();
        //updateProperties(colors);
      });
    });
  }
  colorPalette(quality = 90) {
    const imgData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ).data;
    const colors = [];
    for (
      let i = 0;
      i < this.canvas.width * this.canvas.height;
      i = i + quality
    ) {
      const offset = i * 4;
      const alpha = imgData[offset + 3];
      if (alpha > 0) {
        const red = imgData[offset];
        const green = imgData[offset + 1];
        const blue = imgData[offset + 2];
        colors.push({ red, green, blue });
        //console.log("%c color", `background: rgba(${red}, ${green}, ${blue})`);
      }
    }
    return colors;
  }
}

const draw = new Draw(canvas);

async function renderPokemon(pokemon) {
  await draw.render(pokemon.sprites.front_default);
  return draw;
  /*image.setAttribute("src", pokemon.sprites.front_default);
  image.addEventListener("load", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const colors = getColorPalette(ctx);
    updateProperties(colors);
  });*/
}

/*function getColorPalette(ctx) {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const quality = 90;
  const colors = [];
  for (let i = 0; i < canvas.width * canvas.height; i = i + quality) {
    const offset = i * 4;
    const alpha = imgData[offset + 3];
    if (alpha > 0) {
      const red = imgData[offset];
      const green = imgData[offset + 1];
      const blue = imgData[offset + 2];
      colors.push({ red, green, blue });
      console.log("%c color", `background: rgba(${red}, ${green}, ${blue})`);
    }
  }
  return colors;
}*/

function updateProperties(colors) {
  document.body.style.setProperty(
    "--primary",
    `rgb(${colors[0].red}, ${colors[0].green}, ${colors[0].blue})`
  );
  document.body.style.setProperty(
    "--secondary",
    `rgb(${colors[1].red}, ${colors[1].green}, ${colors[1].blue})`
  );
  document.body.style.setProperty(
    "--tertiary",
    `rgb(${colors[2].red}, ${colors[2].green}, ${colors[2].blue})`
  );
}
