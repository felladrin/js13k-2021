import { bottomRightDroneSprite, canvas, laserFromBottomRightDrone } from "../instances";
import { getRandomLaserColor } from "./getRandomLaserColor";
import { getRandomLaserSize } from "./getRandomLaserSize";

export function updateLaserFromBottomRightDrone() {
  laserFromBottomRightDrone.position = bottomRightDroneSprite.position;
  laserFromBottomRightDrone.width = -canvas.width;
  laserFromBottomRightDrone.height = getRandomLaserSize();
  laserFromBottomRightDrone.color = getRandomLaserColor();
}
