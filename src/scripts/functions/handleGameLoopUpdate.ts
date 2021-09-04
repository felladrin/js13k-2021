import { objectsToAlwaysUpdateAndRender } from "../constants";
import { checkPlatformsCollisionWithLasers } from "./checkPlatformsCollisionWithLasers";
import { checkCollisionWithGems } from "./checkCollisionWithGems";
import { processPortalAnimation } from "./processPortalAnimation";
import { updateCatSprite } from "./updateCatSprite";
import { updateLaserFromTopLeftDrone } from "./updateLaserFromTopLeftDrone";
import { updateLaserFromTopRightDrone } from "./updateLaserFromTopRightDrone";
import { updateLaserFromBottomLeftDrone } from "./updateLaserFromBottomLeftDrone";
import { updateLaserFromBottomRightDrone } from "./updateLaserFromBottomRightDrone";
import { updateDronesVelocity } from "./updateDronesVelocity";

export function handleGameLoopUpdate() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.update());
  processPortalAnimation();
  updateCatSprite();
  checkCollisionWithGems();
  checkPlatformsCollisionWithLasers();
  updateLaserFromTopLeftDrone();
  updateLaserFromBottomLeftDrone();
  updateLaserFromBottomRightDrone();
  updateLaserFromTopRightDrone();
  updateDronesVelocity();
}
