import { Sprite } from "kontra";
import { getCurrentLevel, getPlatformImage, platformsPool, platformsPositionsPerLevel } from "../constants";

export function resetPlatformsFromCurrentLevel() {
  platformsPool.clear();

  platformsPositionsPerLevel[getCurrentLevel()].forEach(([x, y]) => {
    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>) as Sprite;
  });
}
