import { setShouldCheckCollisionBetweenCatAndPortal, setGemsCollectedOnCurrentLevel } from "../../constants/stores";
import { resetGems } from "./resetGems";
import { resetPlatforms } from "./resetPlatforms";
import { resetCat } from "./resetCat";
import { resetDrones } from "./resetDrones";
import { displayEntryPortal } from "./displayEntryPortal";

export function resetCurrentLevel() {
  setShouldCheckCollisionBetweenCatAndPortal(false);
  setGemsCollectedOnCurrentLevel(0);
  resetPlatforms();
  resetGems();
  resetCat();
  resetDrones();
  displayEntryPortal();
}
