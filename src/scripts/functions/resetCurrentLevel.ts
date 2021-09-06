import { setShouldCheckCollisionBetweenCatAndPortal, setGemsCollectedOnCurrentLevel } from "../stores";
import { resetGemsFromCurrentLevel } from "./addGems";
import { resetPlatformsFromCurrentLevel } from "./addPlatforms";
import { resetCat } from "./resetCatPosition";
import { resetDronesPositions } from "./resetDronesPositions";

export function resetCurrentLevel() {
  setShouldCheckCollisionBetweenCatAndPortal(false);
  setGemsCollectedOnCurrentLevel(0);
  resetPlatformsFromCurrentLevel();
  resetGemsFromCurrentLevel();
  resetCat();
  resetDronesPositions();
}
