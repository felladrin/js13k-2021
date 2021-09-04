import { platformsPositionsPerLevel } from "../config";
import { getCurrentLevel, setCurrentLevel } from "../stores";

export function advanceToNextLevelIfPossible() {
  const nextLevel = getCurrentLevel() + 1;

  setCurrentLevel(platformsPositionsPerLevel[nextLevel] ? nextLevel : 0);
}
