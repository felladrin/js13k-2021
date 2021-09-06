import { objectsToAlwaysUpdateAndRender } from "../instances";
import { checkPlatformsCollisionWithLasers } from "./checkPlatformsCollisionWithLasers";
import { checkCatCollisionWithGems } from "./checkCatCollisionWithGems";
import { processPortalAnimation } from "./processPortalAnimation";
import { updateCatSprite } from "./updateCatSprite";
import { updateLaserFromTopLeftDrone } from "./updateLaserFromTopLeftDrone";
import { updateLaserFromTopRightDrone } from "./updateLaserFromTopRightDrone";
import { updateLaserFromBottomLeftDrone } from "./updateLaserFromBottomLeftDrone";
import { updateLaserFromBottomRightDrone } from "./updateLaserFromBottomRightDrone";
import { updateDronesVelocity } from "./updateDronesVelocity";
import { checkCatCollisionWithPortal } from "./checkCatCollisionWithPortal";
import { updateKeyButtonsAnimation } from "./updateKeyButtonsAnimation";
import { updateDronesFollowersPosition } from "./updateDronesFollowersPosition";
import { checkGemsCollisionWithLasers } from "./checkGemsCollisionWithLasers";

export function handleGameLoopUpdate() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.update());
  processPortalAnimation();
  updateCatSprite();
  checkCatCollisionWithGems();
  checkCatCollisionWithPortal();
  checkPlatformsCollisionWithLasers();
  checkGemsCollisionWithLasers();
  updateDronesFollowersPosition();
  updateLaserFromTopLeftDrone();
  updateLaserFromBottomLeftDrone();
  updateLaserFromBottomRightDrone();
  updateLaserFromTopRightDrone();
  updateDronesVelocity();
  updateKeyButtonsAnimation();
}
