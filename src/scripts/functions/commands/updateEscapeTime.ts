import { platformsPositionsPerLevel } from "../../constants/config";
import { getEscapeTime, setEscapeTime } from "../../constants/stores/escapeTime";
import { getCurrentLevel } from "../../constants/stores/currentLevel";

export function updateEscapeTime(deltaTime: number) {
  if (getCurrentLevel() === platformsPositionsPerLevel.length - 1) return;

  setEscapeTime(getEscapeTime() + deltaTime);
}
