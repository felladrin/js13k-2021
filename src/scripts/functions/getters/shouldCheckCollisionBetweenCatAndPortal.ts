import { getGemsCollectedOnCurrentLevel } from "../../constants/stores";

export function shouldCheckCollisionBetweenCatAndPortal() {
  return getGemsCollectedOnCurrentLevel() >= 3;
}
