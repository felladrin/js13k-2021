import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, init, Pool, Sprite } from "kontra";

export const { canvas, context } = init("game");

export const renderText = initFont(font, context);

export const [emitScriptReady, onScriptReady] = createPubSub();

export const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export const [setTimeInGame, , getTimeInGame] = store(0);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = store<((...sound: any) => void) | null>(null);

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = store<Sprite | null>(null);

export const pickupSound = [, , 1425, , , 0.3, 1, 0.45, , , 476, 0.07, , , , , , 0.99, 0.1];

export const jumpSound = [1.01, , 123, 0.04, 0.03, 0.19, , 0.87, -5, -2, , , , , , , , 0.68, 0.07];

export const catSpriteScale = 2;

export const catWalkSpeed = 2.5;

export const catJumpSpeed = 10;

export const gravityAcceleration = 0.5;

export const jumpKeys = ["up", "w", "z"];

export const moveLeftKeys = ["left", "a", "q"];

export const moveRightKeys = ["right", "d"];

export const platformsPool = Pool({
  create: Sprite as any,
});

export const cat = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  scaleX: catSpriteScale,
  scaleY: catSpriteScale,
  anchor: { x: 0.5, y: 1 },
});

export const portalSprite = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
});

export const gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

export const objectsToAlwaysUpdate = [cat, portalSprite, platformsPool];

export const objectsToAlwaysRender = [cat, portalSprite, platformsPool];
