import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, GameObject, getPointer, init, Pool, Sprite } from "kontra";

export const { canvas, context } = init("game");

export const renderText = initFont(font, context);

export const [emitScriptReady, onScriptReady] = createPubSub();

export const [propagateGameLoopUpdate, onGameLoopUpdate] =
  createPubSub<number>();

export const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export const [setCurrentTime, onCurrentTimeUpdated] = store(Date.now());

export const [setGameObjectDragged, , getGameObjectDragged] = store<any>(null);

export const gameStartedTime = Date.now();

export const [setTimeInGame, onTimeInGameChanged] = store(0);

export const gameObject = GameObject({
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

export const textObject = GameObject({
  x: 10,
  y: 10,
  props: {
    text: "TIME: 0",
    color: "white",
    size: 20,
  },
  render: () => {
    renderText(
      textObject.props.text as string,
      textObject.x,
      textObject.y,
      textObject.props.size,
      textObject.props.color
    );
  },
});

export const pool = Pool({
  create: Sprite as any,
});

export const gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

export const objectsToAlwaysUpdate = [gameObject, pool];

export const objectsToAlwaysRender = [gameObject, pool, textObject];
