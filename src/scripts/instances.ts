import { initFont, font } from "tinyfont";
import { GameLoop, init, Pool, Sprite, getContext } from "kontra";
import { propagateGameLoopUpdate, propagateGameLoopRender } from "./events";

export const { canvas } = init("game");

export const renderText = initFont(font, getContext());

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
