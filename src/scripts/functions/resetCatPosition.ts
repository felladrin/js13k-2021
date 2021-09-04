import { catSprite, getCurrentLevel, platformsPositionsPerLevel } from "../constants";

export function resetCatPosition() {
  const [initialPlatform] = platformsPositionsPerLevel[getCurrentLevel()];

  catSprite.x = initialPlatform[0];
  catSprite.y = initialPlatform[1];
}
