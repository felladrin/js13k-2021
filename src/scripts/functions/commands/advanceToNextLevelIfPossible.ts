import { platformsPositionsPerLevel } from "../../constants/config";
import { getCurrentLevel, setCurrentLevel } from "../../constants/stores/currentLevel";

export function advanceToNextLevelIfPossible() {
  const nextLevel = getCurrentLevel() + 1;

  setCurrentLevel(platformsPositionsPerLevel[nextLevel] ? nextLevel : 0);
}
