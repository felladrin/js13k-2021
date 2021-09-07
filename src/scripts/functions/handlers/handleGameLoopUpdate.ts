import { objectsToAlwaysUpdateAndRender } from "../../constants/instances";
import { checkPlatformsCollisionWithLasers } from "../commands/checkPlatformsCollisionWithLasers";
import { checkCatCollisionWithGems } from "../commands/checkCatCollisionWithGems";
import { processPortalAnimation } from "../commands/processPortalAnimation";
import { updateCatSprite } from "../commands/updateCatSprite";
import { updateLaserFromTopLeftDrone } from "../commands/updateLaserFromTopLeftDrone";
import { updateLaserFromTopRightDrone } from "../commands/updateLaserFromTopRightDrone";
import { updateLaserFromBottomLeftDrone } from "../commands/updateLaserFromBottomLeftDrone";
import { updateLaserFromBottomRightDrone } from "../commands/updateLaserFromBottomRightDrone";
import { updateDronesVelocity } from "../commands/updateDronesVelocity";
import { checkCatCollisionWithPortal } from "../commands/checkCatCollisionWithPortal";
import { updateKeyButtonsAnimation } from "../commands/updateKeyButtonsAnimation";
import { updateDronesFollowersPosition } from "../commands/updateDronesFollowersPosition";
import { checkGemsCollisionWithLasers } from "../commands/checkGemsCollisionWithLasers";

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
