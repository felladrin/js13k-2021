import "minireset.css";
import "./main.css";
import { render, html } from "uhtml";
import { init, Sprite, GameLoop, degToRad } from "kontra";
import { contain } from "math-fit";
import { createPubSub } from "create-pubsub";

const [broadcastMainScriptLoaded, listenMainScriptLoaded] = createPubSub();

const [propagateGameLoopUpdate, listenGameLoopUpdate] = createPubSub<
  number | undefined
>();

const [propagateGameLoopRender, listenGameLoopRender] = createPubSub();

const hudHtmlElement = document.getElementById("hud") as HTMLDivElement;

const gameCanvasElement = document.getElementById("game") as HTMLCanvasElement;

function resizeGame() {
  if (!gameCanvasElement.parentElement) return;

  const fittingProps = contain(
    { w: gameCanvasElement.width, h: gameCanvasElement.height },
    {
      w: gameCanvasElement.parentElement.clientWidth,
      h: gameCanvasElement.parentElement.clientHeight,
    }
  );

  const style: Partial<CSSStyleDeclaration> = {
    top: `${fittingProps.top}px`,
    left: `${fittingProps.left}px`,
    width: `${fittingProps.width}px`,
    height: `${fittingProps.height}px`,
  };

  for (const declaration of Object.keys(style)) {
    gameCanvasElement.style[declaration as any] = (
      style as Record<string, string>
    )[declaration];
    hudHtmlElement.style[declaration as any] = (
      style as Record<string, string>
    )[declaration];
  }

  window.scrollTo(1, 0);
}

init(gameCanvasElement);

resizeGame();

window.addEventListener("resize", resizeGame);

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
});

listenGameLoopUpdate(() => {
  sprite.update();
  sprite.rotation += degToRad(4);
  if (sprite.x > gameCanvasElement.width) sprite.x = -sprite.width;
});

listenGameLoopRender(() => sprite.render());

let gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

const [setCurrentTime, onCurrentTimeUpdated] = createPubSub(Date.now());

setInterval(() => {
  setCurrentTime(Date.now());
}, 1000);

const gameStartedTime = Date.now();

const [setTimeInGame, onTimeInGameChanged, getTimeInGame] = createPubSub(0);

onCurrentTimeUpdated((currentTime) => {
  setTimeInGame(Math.floor((currentTime - gameStartedTime) / 1000));
});

const [setHudHtml, onHudHtmlChanged, getHutHtml] = createPubSub(
  html`<p>Time: ${getTimeInGame()}</p>`
);

onTimeInGameChanged((timeInGame) => {
  setHudHtml(html`<p>Time: ${timeInGame}</p>`);
});

listenMainScriptLoaded(() => {
  render(hudHtmlElement, getHutHtml());
  onHudHtmlChanged((hudHtml) => render(hudHtmlElement, hudHtml));
  gameLoop.start();
});

broadcastMainScriptLoaded();
