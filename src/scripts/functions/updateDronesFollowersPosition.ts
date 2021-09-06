import { maximumLaserY } from "../config";
import {
  bottomLeftDroneFollowerSprite,
  bottomLeftDroneSprite,
  bottomRightDroneFollowerSprite,
  bottomRightDroneSprite,
  canvas,
  topLeftDroneFollowerSprite,
  topLeftDroneSprite,
  topRightDroneFollowerSprite,
  topRightDroneSprite,
} from "../instances";

export function updateDronesFollowersPosition() {
  topLeftDroneFollowerSprite.x = canvas.width;
  topLeftDroneFollowerSprite.y = topLeftDroneSprite.y;

  topRightDroneFollowerSprite.x = topRightDroneSprite.x;
  topRightDroneFollowerSprite.y = maximumLaserY;

  bottomLeftDroneFollowerSprite.x = bottomLeftDroneSprite.x;
  bottomLeftDroneFollowerSprite.y = 0;

  bottomRightDroneFollowerSprite.x = 0;
  bottomRightDroneFollowerSprite.y = bottomRightDroneSprite.y;
}
