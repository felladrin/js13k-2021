import { setGemsCollectedOnCurrentLevel } from "../../constants/stores";
import { displayEntryPortal } from "./displayEntryPortal";
import { resetCat } from "./resetCat";
import { resetDrones } from "./resetDrones";
import { resetGems } from "./resetGems";
import { resetPlatforms } from "./resetPlatforms";

export function resetCurrentLevel() {
  setGemsCollectedOnCurrentLevel(0);
  resetPlatforms();
  resetGems();
  resetCat();
  resetDrones();
  displayEntryPortal();
}
