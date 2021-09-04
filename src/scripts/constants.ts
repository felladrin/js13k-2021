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

export const [setCatMoving, , getCatMoving] = store(false);

export const [setBackgroundMusicPlaying, , getBackgroundMusicPlaying] = store(false);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = store<(...sound: any) => void>();

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = store<Sprite | null>(null);

export const [setShouldCheckCollisionBetweenCatAndPortal, , shouldCheckCollisionBetweenCatAndPortal] = store(false);

export const [setGemsCollectedOnCurrentLevel, onGemsCollectedOnCurrentLevelUpdated, getGemsCollectedOnCurrentLevel] =
  store(0);

export const [emitCatSpriteSheetImageLoaded, onCatSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPortalSpriteSheetImageLoaded, onPortalSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPlatformImageLoaded, , getPlatformImage] = createPubSub<HTMLImageElement>();

export const [emitGemSpriteSheetImageLoaded, onGemSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [setGemAnimations, , getGemAnimations] = store<SpriteSheet["animations"]>();

export const [setCurrentLevel, onCurrentLevelChanged, getCurrentLevel] = store(0);

export const pickupSound = [0.8, 5, 578, , 0.01, 0.21, , 1.01, , , , , , , , , 0.06, 0.68, 0.09];

export const jumpSound = [1, , 123, 0.04, 0.03, 0.19, , 0.87, -5, -2, , , , , , , , 0.68, 0.07];

export const catWalkSpeed = 1.75;

export const catJumpSpeed = 6.8;

export const droneSpeed = 0.1;

export const catFallingAcceleration = 0.4;

export const jumpKeys = ["up", "w", "z"];

export const moveLeftKeys = ["left", "a", "q"];

export const moveRightKeys = ["right", "d"];

export const platformsPositionsPerLevel: [x: number, y: number][][] = [
  [
    [30, 340],
    [76, 300],
    [122, 260],
    [170, 220],
  ],
  [
    [180, 340],
    [76, 300],
    [254, 300],
    [180, 260],
    [120, 215],
    [37, 250],
  ],
];

export const gemsPositionsPerLevel: [x: number, y: number][][] = [
  [
    [76, 285],
    [122, 245],
    [170, 205],
  ],
  [
    [76, 285],
    [121, 195],
    [254, 285],
  ],
];

export const platformsPool = Pool({ create: Sprite as any });

export const gemsPool = Pool({ create: Sprite as any });

export const catSprite = Sprite({
  anchor: { x: 0.5, y: 1 },
});

export const portalSprite = Sprite({
  x: 180,
  y: 180,
  anchor: { x: 0.5, y: 0.5 },
});

export const gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

const commonDroneProperties = {
  width: 6,
  height: 6,
  color: "#184E77",
  anchor: { x: 0.5, y: 0.5 },
} as Partial<Sprite>;

export const topLeftDroneSprite = Sprite(commonDroneProperties);

export const topRightDroneSprite = Sprite(commonDroneProperties);

export const bottomLeftDroneSprite = Sprite(commonDroneProperties);

export const bottomRightDroneSprite = Sprite(commonDroneProperties);

export const laserFromTopLeftDrone = Sprite({
  anchor: { x: 0, y: 0.5 },
});

export const laserFromBottomRightDrone = Sprite({
  anchor: { x: 0, y: 0.5 },
});

export const laserFromBottomLeftDrone = Sprite({
  anchor: { x: 0.5, y: 0 },
});

export const laserFromTopRightDrone = Sprite({
  anchor: { x: 0.5, y: 0 },
});

export const objectsToAlwaysUpdateAndRender = [
  gemsPool,
  portalSprite,
  catSprite,
  platformsPool,
  laserFromTopLeftDrone,
  laserFromBottomLeftDrone,
  laserFromBottomRightDrone,
  laserFromTopRightDrone,
  topLeftDroneSprite,
  topRightDroneSprite,
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
];
