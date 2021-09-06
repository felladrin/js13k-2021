import { apertureSize } from "../config";
import { portalSprite } from "../instances";
import { getGemsCollectedOnCurrentLevel } from "../stores";

export function processPortalAnimation() {
  portalSprite.playAnimation(apertureSize[getGemsCollectedOnCurrentLevel()].toLowerCase());
}
