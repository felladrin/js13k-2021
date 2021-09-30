import { apertureSize } from "../../constants/config";
import { portalSprite } from "../../constants/instances";
import { getGemsCollectedOnCurrentLevel } from "../../constants/stores";

export function processPortalAnimation() {
  portalSprite.playAnimation(apertureSize[getGemsCollectedOnCurrentLevel()].toLowerCase());
}
