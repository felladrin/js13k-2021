import { maximumLaserY } from "../../constants/config";
import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  canvas,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../../constants/instances";

export function resetDrones() {
  topLeftDroneSprite.x = 0;
  topLeftDroneSprite.y = 1;

  topRightDroneSprite.x = canvas.width - 1;
  topRightDroneSprite.y = 0;

  bottomLeftDroneSprite.x = 1;
  bottomLeftDroneSprite.y = maximumLaserY;

  bottomRightDroneSprite.x = canvas.width;
  bottomRightDroneSprite.y = maximumLaserY;
}
