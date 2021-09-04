import { setShouldCheckCollisionBetweenCatAndPortal, setGemsCollectedOnCurrentLevel } from "../stores";
import { resetGemsFromCurrentLevel } from "./addGems";
import { resetPlatformsFromCurrentLevel } from "./addPlatforms";
import { resetCatPosition } from "./resetCatPosition";
import { resetDronesPositions } from "./resetDronesPositions";

export function resetCurrentLevel() {
  setShouldCheckCollisionBetweenCatAndPortal(false);
  setGemsCollectedOnCurrentLevel(0);
  resetPlatformsFromCurrentLevel();
  resetGemsFromCurrentLevel();
  resetCatPosition();
  resetDronesPositions();
}
