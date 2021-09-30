import { getGemsCollectedOnCurrentLevel } from "../../constants/stores/gemsCollectedOnCurrentLevel";

export function shouldCheckCollisionBetweenCatAndPortal() {
  return getGemsCollectedOnCurrentLevel() >= 3;
}
