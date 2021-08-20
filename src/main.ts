import { createPubSub, createPubSub as store } from "create-pubsub";
import {
  GameLoop,
  GameObject,
  getPointer,
  init,
  initPointer,
  track,
} from "kontra";
import { contain } from "math-fit";
import "minireset.css";
import { html, render } from "uhtml";
import "./main.css";

//#region Constants
const { canvas } = init("game");

const hud = document.getElementById("hud") as HTMLDivElement;

const [broadcastMainScriptLoaded, listenMainScriptLoaded] = createPubSub();

const [propagateGameLoopUpdate, listenGameLoopUpdate] = createPubSub<number>();

const [propagateGameLoopRender, listenGameLoopRender] = createPubSub();

const [setCurrentTime, onCurrentTimeUpdated] = store(Date.now());

const [setGameObjectDragged, , getGameObjectDragged] = store<any>(null);

const gameObject = GameObject({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 31,
  height: 82,
  scaleX: 2,
  scaleY: 2,
  anchor: { x: 0.5, y: 0.5 },
  custom: {
    color: "gray",
  },
  onOver: () => {
    if (getGameObjectDragged() !== null) return;
    gameObject.custom.color = "red";
  },
  onOut: () => {
    if (getGameObjectDragged() !== null) return;
    gameObject.custom.color = gameObject.custom.color;
  },
  onUp: () => {
    if (getGameObjectDragged() === null) return;
    setGameObjectDragged(null);
    gameObject.custom.color = gameObject.custom.color;
  },
  onDown: () => {
    if (getGameObjectDragged() !== null) return;
    setGameObjectDragged(gameObject);
    gameObject.custom.color = "green";
  },
  render: () => {
    const ctx = gameObject.context;
    ctx.fillStyle = gameObject.custom.color;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.bezierCurveTo(19.14, 0, 22.5, 3.35, 22.5, 7.5);
    ctx.bezierCurveTo(22.5, 11.64, 19.14, 15, 15, 15);
    ctx.bezierCurveTo(10.85, 15, 7.5, 11.64, 7.5, 7.5);
    ctx.bezierCurveTo(7.5, 3.35, 10.85, 0, 15, 0);
    ctx.moveTo(15, 15);
    ctx.lineTo(15, 40);
    ctx.moveTo(15, 20);
    ctx.lineTo(0, 20);
    ctx.moveTo(15, 20);
    ctx.lineTo(30, 20);
    ctx.moveTo(15, 40);
    ctx.lineTo(0, 60);
    ctx.moveTo(15, 40);
    ctx.lineTo(30, 60);
    ctx.fill();
    ctx.stroke();
  },
  update: () => {
    gameObject.advance();

    if (getGameObjectDragged() === gameObject) {
      gameObject.x = getPointer().x;
      gameObject.y = getPointer().y;
    } else if (gameObject.y + gameObject.height / 2 < canvas.height) {
      gameObject.ddy = 0.5;
    } else {
      gameObject.dy = 0;
      gameObject.ddy = 0;
    }
  },
});

let gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

const gameStartedTime = Date.now();

const [setTimeInGame, onTimeInGameChanged, getTimeInGame] = store(0);

const [setHudHtml, onHudHtmlChanged, getHutHtml] = store(
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
  gameObject.update();
});

listenGameLoopRender(() => {
  gameObject.render();
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
  track(gameObject);
  resizeGame();
  render(hud, getHutHtml());
  gameLoop.start();
});

onHudHtmlChanged((hudHtml) => render(hud, hudHtml));
//#endregion

broadcastMainScriptLoaded();
