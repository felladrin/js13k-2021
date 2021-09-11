import { platformsPositionsPerLevel } from "../../constants/config";
import { catSprite, entryPortalSprite } from "../../constants/instances";
import { getCurrentLevel, setPlatformWhichCatIsOn } from "../../constants/stores";

export function resetCat() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];

  entryPortalSprite.x = initialPlatform[0] - 10;
  entryPortalSprite.y = initialPlatform[1] - 28;

  entryPortalSprite.playAnimation("entry");

  catSprite.x = initialPlatform[0];
  catSprite.y = initialPlatform[1] - 12;

  catSprite.dx = catSprite.dy = catSprite.ddx = catSprite.ddy = 0;

  setPlatformWhichCatIsOn(null);
}
