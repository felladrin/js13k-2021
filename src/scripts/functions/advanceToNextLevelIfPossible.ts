import { getCurrentLevel, platformsPositionsPerLevel, setCurrentLevel } from "../constants";

export function advanceToNextLevelIfPossible() {
  const nextLevel = getCurrentLevel() + 1;

  setCurrentLevel(platformsPositionsPerLevel[nextLevel] ? nextLevel : 0);
}
