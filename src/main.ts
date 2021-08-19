import "minireset.css";
import "./main.css";
import { render, html } from "uhtml";
import { init, initPointer, Sprite, GameLoop, degToRad } from "kontra";
import { contain } from "math-fit";
import { createPubSub, createPubSub as createStore } from "create-pubsub";

//#region Constants
const { canvas } = init("game");

const hud = document.getElementById("hud") as HTMLDivElement;

const [broadcastMainScriptLoaded, listenMainScriptLoaded] = createPubSub();

const [propagateGameLoopUpdate, listenGameLoopUpdate] = createPubSub<number>();

const [propagateGameLoopRender, listenGameLoopRender] = createPubSub();

const [setCurrentTime, onCurrentTimeUpdated] = createStore(Date.now());

const weaponImage = {
  path: new Path2D("M19 3h-3v1h-1V3H9L4 4v1h5v2h2v14h2V7h2V6h1v1h3V4 3z"),
  originalWidth: 24,
  originalHeight: 24,
  desiredWidth: 48,
  desiredHeight: 48,
};

const sprite = Sprite({
  y: weaponImage.desiredHeight * 2,
  width: weaponImage.originalWidth,
  height: weaponImage.originalHeight,
  scaleX: weaponImage.desiredWidth / weaponImage.originalWidth,
  scaleY: weaponImage.desiredHeight / weaponImage.originalHeight,
  anchor: { x: 0.5, y: 0.5 },
  dx: 2,
  render: () => {
    sprite.context.fillStyle = "gray";
    sprite.context.beginPath();
    sprite.context.fill(weaponImage.path);
    sprite.context.closePath();
  },
  update: () => {
    sprite.advance();
    sprite.rotation += degToRad(4);
    if (sprite.x > canvas.width) sprite.x = -sprite.width;
  },
});

let gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

const gameStartedTime = Date.now();

const [setTimeInGame, onTimeInGameChanged, getTimeInGame] = createStore(0);

const [setHudHtml, onHudHtmlChanged, getHutHtml] = createStore(
  html`<p>Time: ${getTimeInGame()}</p>`
);
//#endregion

//#region Functions
function resizeGame() {
  if (!canvas.parentElement) return;

  const fittingProps = contain(
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
    canvas.style[declaration as any] = (style as Record<string, string>)[
      declaration
    ];
    hud.style[declaration as any] = (style as Record<string, string>)[
      declaration
    ];
  }

  window.scrollTo(1, 0);
}
//#endregion

//#region Listeners
window.addEventListener("resize", resizeGame);

listenGameLoopUpdate(() => {
  sprite.update();
});

listenGameLoopRender(() => {
  sprite.render();
});

setInterval(() => {
  setCurrentTime(Date.now());
}, 1000);

onCurrentTimeUpdated((currentTime) => {
  setTimeInGame(Math.floor((currentTime - gameStartedTime) / 1000));
});

onTimeInGameChanged((timeInGame) => {
  setHudHtml(html`<p>Time: ${timeInGame}</p>`);
});

listenMainScriptLoaded(() => {
  initPointer();
  resizeGame();
  render(hud, getHutHtml());
  gameLoop.start();
});

onHudHtmlChanged((hudHtml) => render(hud, hudHtml));
//#endregion

broadcastMainScriptLoaded();
