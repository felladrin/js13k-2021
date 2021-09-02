import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, init, Pool, Sprite, getContext, SpriteSheet } from "kontra";

export const { canvas } = init("game");

export const renderText = initFont(font, getContext());

export const [emitScriptReady, onScriptReady] = createPubSub();

const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export { onGameLoopUpdate };

const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export { onGameLoopRender };

export const [setTimeInGame, , getTimeInGame] = store(0);

export const [setBackgroundMusicPlaying, , getBackgroundMusicPlaying] = store(false);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = store<(...sound: any) => void>();

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = store<Sprite | null>(null);

export const [emitCatSpriteSheetImageLoaded, onCatSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPortalSpriteSheetImageLoaded, onPortalSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPlatformImageLoaded, , getPlatformImage] = createPubSub<HTMLImageElement>();

export const [emitGemSpriteSheetImageLoaded, onGemSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [setGemAnimations, , getGemAnimations] = store<SpriteSheet["animations"]>();

export const pickupSound = [0.8, 5, 578, , 0.01, 0.21, , 1.01, , , , , , , , , 0.06, 0.68, 0.09];

export const jumpSound = [1, , 123, 0.04, 0.03, 0.19, , 0.87, -5, -2, , , , , , , , 0.68, 0.07];

export const catWalkSpeed = 1.75;

export const catJumpSpeed = 6.8;

export const catFallingAcceleration = 0.4;

export const jumpKeys = ["up", "w", "z"];

export const moveLeftKeys = ["left", "a", "q"];

export const moveRightKeys = ["right", "d"];

const commonPoolParameters = { create: Sprite as any };

export const platformsPool = Pool(commonPoolParameters);

export const gemsPool = Pool(commonPoolParameters);

export const catSprite = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
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

const commonDroneProperties = {
  width: 10,
  height: 10,
  color: "black",
  anchor: { x: 0.5, y: 0.5 },
} as Partial<Sprite>;

export const topLeftDroneSprite = Sprite({
  ...commonDroneProperties,
  dx: 0.05,
  dy: 0.05,
  x: 10,
  y: 10,
});

export const topRightDroneSprite = Sprite({
  ...commonDroneProperties,
  dx: -0.05,
  dy: 0.05,
  x: canvas.width - 10,
  y: 10,
});

export const bottomLeftDroneSprite = Sprite({
  ...commonDroneProperties,
  dx: 0.05,
  dy: -0.05,
  x: 10,
  y: canvas.height - 10,
});

export const bottomRightDroneSprite = Sprite({
  ...commonDroneProperties,
  dx: -0.05,
  dy: -0.05,
  x: canvas.width - 10,
  y: canvas.height - 10,
});

export const topLaserSprite = Sprite({
  anchor: { x: 0, y: 0.5 },
});

export const bottomLaserSprite = Sprite({
  anchor: { x: 0, y: 0.5 },
});

export const leftLaserSprite = Sprite({
  anchor: { x: 0.5, y: 0 },
});

export const rightLaserSprite = Sprite({
  anchor: { x: 0.5, y: 0 },
});

export const objectsToAlwaysUpdate = [
  gemsPool,
  portalSprite,
  catSprite,
  platformsPool,
  topLaserSprite,
  bottomLaserSprite,
  leftLaserSprite,
  rightLaserSprite,
  topLeftDroneSprite,
  topRightDroneSprite,
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
];

export const objectsToAlwaysRender = [
  gemsPool,
  portalSprite,
  catSprite,
  platformsPool,
  topLaserSprite,
  bottomLaserSprite,
  leftLaserSprite,
  rightLaserSprite,
  topLeftDroneSprite,
  topRightDroneSprite,
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
];
