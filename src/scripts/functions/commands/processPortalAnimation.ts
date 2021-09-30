import { apertureSize } from "../../constants/config";
import { portalSprite } from "../../constants/instances";
import { getGemsCollectedOnCurrentLevel } from "../../constants/stores/gemsCollectedOnCurrentLevel";

export function processPortalAnimation() {
  portalSprite.playAnimation(apertureSize[getGemsCollectedOnCurrentLevel()].toLowerCase());
}
