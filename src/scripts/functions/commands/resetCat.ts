import { platformsPositionsPerLevel } from "../../constants/config";
import { catSprite } from "../../constants/instances";
import { getCurrentLevel, setPlatformWhichCatIsOn } from "../../constants/stores";

export function resetCat() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];
  const [x, y] = initialPlatform;

  catSprite.x = x;
  catSprite.y = y - 12;

  catSprite.dx = catSprite.dy = catSprite.ddx = catSprite.ddy = 0;

  setPlatformWhichCatIsOn(null);
}
