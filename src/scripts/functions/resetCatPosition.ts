import { platformsPositionsPerLevel } from "../config";
import { catSprite } from "../instances";
import { getCurrentLevel } from "../stores";

export function resetCat() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];

  catSprite.x = initialPlatform[0];
  catSprite.y = initialPlatform[1];

  catSprite.dx = catSprite.dy = catSprite.ddx = catSprite.ddy = 0;
}
