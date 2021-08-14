import "minireset.css";
import "./main.css";
import { render, html } from "uhtml";
import { createStore, createDerived } from "nanostores";
import { init, Sprite, GameLoop, degToRad } from "kontra";
import { TypedEventDispatcher } from "typed-event-dispatcher";
import { contain } from "math-fit";

const { dispatch: dispatchMainScriptLoaded, getter: mainScriptLoadedEvent } =
  new TypedEventDispatcher();

const { dispatch: dispatchGameLoopUpdated, getter: gameLoopUpdatedEvent } =
  new TypedEventDispatcher();

const { dispatch: dispatchGameLoopRendered, getter: gameLoopRenderedEvent } =
  new TypedEventDispatcher();

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

gameLoopUpdatedEvent.addListener(() => {
  sprite.update();
  sprite.rotation += degToRad(4);
  if (sprite.x > gameCanvasElement.width) sprite.x = -sprite.width;
});

gameLoopRenderedEvent.addListener(() => sprite.render());

let gameLoop = GameLoop({
  update: () => dispatchGameLoopUpdated(),
  render: () => dispatchGameLoopRendered(),
});

const currentTimeStore = createStore<number>(() => {
  currentTimeStore.set(Date.now());
  const timerId = setInterval(() => {
    currentTimeStore.set(Date.now());
  }, 1000);
  return () => {
    clearInterval(timerId);
  };
});

const gameStartedTimeStore = createStore<number>(() => {
  gameStartedTimeStore.set(Date.now());
});

const timeInGameStore = createDerived(
  [gameStartedTimeStore, currentTimeStore],
  (gameStartedTime, currentTime) =>
    Math.floor((currentTime - gameStartedTime) / 1000)
);

const hudHtmlStore = createDerived(
  [timeInGameStore],
  (timeInGame) => html`<p>Time: ${timeInGame}</p>`
);

mainScriptLoadedEvent.addListener(() => {
  hudHtmlStore.subscribe((hudHtml) => render(hudHtmlElement, hudHtml));
  gameLoop.start();
});

dispatchMainScriptLoaded();
