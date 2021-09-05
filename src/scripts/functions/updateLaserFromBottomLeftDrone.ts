import { bottomLeftDroneSprite, canvas, laserFromBottomLeftDrone } from "../instances";
import { getRandomLaserColor } from "./getRandomLaserColor";
import { getRandomLaserSize } from "./getRandomLaserSize";

export function updateLaserFromBottomLeftDrone() {
  laserFromBottomLeftDrone.position = bottomLeftDroneSprite.position;
  laserFromBottomLeftDrone.height = -canvas.height;
  laserFromBottomLeftDrone.width = getRandomLaserSize();
  laserFromBottomLeftDrone.color = getRandomLaserColor();
}
