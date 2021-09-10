import { setShouldCheckCollisionBetweenCatAndPortal, setGemsCollectedOnCurrentLevel } from "../../constants/stores";
import { resetGems } from "./resetGems";
import { resetPlatforms } from "./resetPlatforms";
import { resetCat } from "./resetCat";
import { resetDronesPositions } from "./resetDronesPositions";

export function resetCurrentLevel() {
  setShouldCheckCollisionBetweenCatAndPortal(false);
  setGemsCollectedOnCurrentLevel(0);
  resetPlatforms();
  resetGems();
  resetCat();
  resetDronesPositions();
}
