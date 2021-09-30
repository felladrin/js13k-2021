import { platformsPositionsPerLevel } from "../../constants/config";
import { entryPortalSprite } from "../../constants/instances";
import { getCurrentLevel } from "../../constants/stores/currentLevel";

export function displayEntryPortal() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];
  const [x, y] = initialPlatform;

  entryPortalSprite.x = x - 10;
  entryPortalSprite.y = y - 28;

  entryPortalSprite.playAnimation("entry");
}
