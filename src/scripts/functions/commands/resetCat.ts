import { platformsPositionsPerLevel } from "../../constants/config";
import { catSprite } from "../../constants/instances";
import { getCurrentLevel } from "../../constants/stores";

export function resetCat() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];

  catSprite.x = initialPlatform[0];
  catSprite.y = initialPlatform[1];

  catSprite.dx = catSprite.dy = catSprite.ddx = catSprite.ddy = 0;
}
