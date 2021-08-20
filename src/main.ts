import { createPubSub, createPubSub as store } from "create-pubsub";
import {
  GameLoop,
  GameObject,
  getPointer,
  init,
  initPointer,
  track,
  Text,
  Pool,
  Sprite,
  collides,
} from "kontra";
import { contain } from "math-fit";
import "minireset.css";
import "./main.css";

//#region Constants
const { canvas } = init("game");

const [broadcastMainScriptLoaded, listenMainScriptLoaded] = createPubSub();

const [propagateGameLoopUpdate, listenGameLoopUpdate] = createPubSub<number>();

const [propagateGameLoopRender, listenGameLoopRender] = createPubSub();

const [setCurrentTime, onCurrentTimeUpdated] = store(Date.now());

const [setGameObjectDragged, , getGameObjectDragged] = store<any>(null);

const gameStartedTime = Date.now();

const [setTimeInGame, onTimeInGameChanged] = store(0);

const gameObject = GameObject({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 31,
  height: 82,
  scaleX: 2,
  scaleY: 2,
  anchor: { x: 0.5, y: 0.5 },
  props: {
    defaultColor: "gray",
    color: "gray",
  },
  onOver: () => {
    if (getGameObjectDragged() !== null) return;
    gameObject.props.color = "red";
  },
  onOut: () => {
    if (getGameObjectDragged() !== null) return;
    gameObject.props.color = gameObject.props.defaultColor;
  },
  onUp: () => {
    if (getGameObjectDragged() === null) return;
    setGameObjectDragged(null);
    gameObject.props.color = gameObject.props.defaultColor;
  },
  onDown: () => {
    if (getGameObjectDragged() !== null) return;
    setGameObjectDragged(gameObject);
    gameObject.props.color = "green";
  },
  render: () => {
    const ctx = gameObject.context;
    ctx.fillStyle = gameObject.props.color;
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

let textObject = Text({
  text: "Time: 0",
  font: "24px Arial",
  color: "white",
  x: 10,
  y: 10,
  anchor: { x: 0, y: 0 },
  textAlign: "center",
});

let pool = Pool({
  create: Sprite as any,
});

setInterval(() => {
  const spawned = pool.get({
    x: textObject.x,
    y: textObject.y,
    velocity: gameObject.position
      .subtract(textObject.position)
      .normalize()
      .scale(5),
    width: 4,
    height: 4,
    color: "red",
    props: {
      collided: false,
    },
    update: () => {
      spawned.advance();

      if (isOutOfCanvasBounds(spawned)) {
        spawned.ttl = 0;
      }

      if (spawned.props.collided) {
        spawned.scaleX -= 0.01;
        spawned.scaleY -= 0.01;
        if (spawned.scaleX < 0 || spawned.scaleY < 0) {
          spawned.ttl = 0;
        }
      } else if (collides(spawned, gameObject)) {
        spawned.props.collided = true;
        spawned.dx = -spawned.dx * Math.random();
        spawned.dy = -spawned.dy * Math.random();
        spawned.ddy = 0.1;
      }
    },
  } as Partial<Sprite>) as Sprite;
}, 100);

let gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});
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
  }

  window.scrollTo(1, 0);
}

function isOutOfCanvasBounds(gameObject: GameObject) {
  return (
    gameObject.x > canvas.width ||
    gameObject.y > canvas.height ||
    gameObject.x < 0 ||
    gameObject.y < 0
  );
}

const objectsToAlwaysUpdate = [gameObject, pool];
const objectsToAlwaysRender = [gameObject, textObject, pool];
//#endregion

//#region Listeners
window.addEventListener("resize", resizeGame);

listenGameLoopUpdate(() => {
  objectsToAlwaysUpdate.forEach((object) => object.update());
});

listenGameLoopRender(() => {
  objectsToAlwaysRender.forEach((object) => object.render());
});

setInterval(() => {
  setCurrentTime(Date.now());
}, 1000);

onCurrentTimeUpdated((currentTime) => {
  setTimeInGame(Math.floor((currentTime - gameStartedTime) / 1000));
});

onTimeInGameChanged((timeInGame) => {
  textObject.text = `Time: ${timeInGame}`;
});

listenMainScriptLoaded(() => {
  initPointer();
  track(gameObject);
  resizeGame();
  gameLoop.start();
});
//#endregion

broadcastMainScriptLoaded();
