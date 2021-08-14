import "minireset.css";
import "./main.css";
import { render, html } from "uhtml";
import { createStore, createDerived } from "nanostores";
import { init, Sprite, GameLoop, emit, on, degToRad } from "kontra";
// @ts-ignore
import fit from "math-fit";

const hudHtmlElement = document.getElementById("hud") as HTMLDivElement;

enum GlobalEvent {
  GameLoopUpdated = "GameLoopUpdated",
  GameLoopRendered = "GameLoopRendered",
}

let { canvas } = init("game");

function handleWindowResize() {
  if (!canvas.parentElement) return;

  const fittingProps = fit.contain(
    { w: canvas.width, h: canvas.height },
    {
      w: canvas.parentElement.clientWidth,
      h: canvas.parentElement.clientHeight,
    }
  );

  const style: Partial<CSSStyleDeclaration> = {
    top: `${fittingProps.top}px`,
    left: `${fittingProps.left}px`,
    width: `${fittingProps.width}px`,
    height: `${fittingProps.height}px`,
  };

  for (const declaration of Object.keys(style)) {
    // @ts-ignore
    canvas.style[declaration] = (style as Record<string, string>)[declaration];
    // @ts-ignore
    hudHtmlElement.style[declaration] = (style as Record<string, string>)[
      declaration
    ];
  }

  window.scrollTo(1, 0);
}

handleWindowResize();

window.addEventListener("resize", handleWindowResize);

const iconInfo = {
  path: new Path2D("M19 3h-3v1h-1V3H9L4 4v1h5v2h2v14h2V7h2V6h1v1h3V4 3z"),
  originalWidth: 24,
  originalHeight: 24,
  desiredWidth: 48,
  desiredHeight: 48,
};

const sprite = Sprite({
  y: iconInfo.desiredHeight * 2,
  width: iconInfo.originalWidth,
  height: iconInfo.originalHeight,
  scaleX: iconInfo.desiredWidth / iconInfo.originalWidth,
  scaleY: iconInfo.desiredHeight / iconInfo.originalHeight,
  anchor: { x: 0.5, y: 0.5 },
  color: "gray",
  render: () => {
    sprite.context.fillStyle = sprite.color;
    sprite.context.beginPath();
    sprite.context.fill(iconInfo.path);
    sprite.context.closePath();
  },
  update: () => {
    sprite.advance();
    sprite.rotation += degToRad(4);
    if (sprite.x > canvas.width) sprite.x = -sprite.width;
  },
});

sprite.dx = 2;

on(GlobalEvent.GameLoopUpdated, () => sprite.update());
on(GlobalEvent.GameLoopRendered, () => sprite.render());

let loop = GameLoop({
  update: () => emit(GlobalEvent.GameLoopUpdated),
  render: () => emit(GlobalEvent.GameLoopRendered),
});

const currentTimeStore = createStore<number>(() => {
  currentTimeStore.set(Date.now());
  const updating = setInterval(() => {
    currentTimeStore.set(Date.now());
  }, 1000);
  return () => {
    clearInterval(updating);
  };
});

const timeWhenAppStarted = Date.now();

const timeInGameStore = createDerived([currentTimeStore], (currentTime) =>
  Math.floor((currentTime - timeWhenAppStarted) / 1000)
);

const hudHtmlStore = createDerived(
  [timeInGameStore],
  (timeInGame) => html`<p>Time: ${timeInGame}</p>`
);

hudHtmlStore.subscribe((hudHtml) => render(hudHtmlElement, hudHtml));
loop.start();
