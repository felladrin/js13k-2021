import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, init, Pool, Sprite, getContext } from "kontra";

export const { canvas } = init("game");

export const renderText = initFont(font, getContext());

export const [emitScriptReady, onScriptReady] = createPubSub();

const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export { onGameLoopUpdate };

const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export { onGameLoopRender };

export const [setTimeInGame, , getTimeInGame] = store(0);

export const [setBackgroundMusicPlaying, , getBackgroundMusicPlaying] = store(false);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = store<((...sound: any) => void) | null>(null);

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = store<Sprite | null>(null);

export const [emitCatSpriteSheetImageLoaded, onCatSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPortalSpriteSheetImageLoaded, onPortalSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPlatformImageLoaded, , getPlatformImage] = createPubSub<HTMLImageElement>();

// export const pickupSound = [, , 1425, , , 0.3, 1, 0.45, , , 476, 0.07, , , , , , 0.99, 0.1];

export const jumpSound = [1.01, , 123, 0.04, 0.03, 0.19, , 0.87, -5, -2, , , , , , , , 0.68, 0.07];

export const catSpriteScale = 1;

export const catWalkSpeed = 1.75;

export const catJumpSpeed = 6.8;

export const catFallingAcceleration = 0.4;

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
