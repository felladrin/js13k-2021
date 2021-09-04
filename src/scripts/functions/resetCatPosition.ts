import { platformsPositionsPerLevel } from "../config";
import { catSprite } from "../instances";
import { getCurrentLevel } from "../stores";

export function resetCatPosition() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];

  catSprite.x = initialPlatform[0];
  catSprite.y = initialPlatform[1];
}
