import { Sprite } from "kontra";
import { platformsPositionsPerLevel } from "../../constants/config";
import { platformsPool } from "../../constants/instances";
import { getCurrentLevel, getPlatformImage } from "../../constants/stores";

export function resetPlatforms() {
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
