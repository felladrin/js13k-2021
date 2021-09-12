import { platformsPositionsPerLevel } from "../../constants/config";
import { getCurrentLevel, getEscapeTime, setEscapeTime } from "../../constants/stores";

export function updateEscapeTime(deltaTime: number) {
  if (getCurrentLevel() === platformsPositionsPerLevel.length - 1) return;

  setEscapeTime(getEscapeTime() + deltaTime);
}
