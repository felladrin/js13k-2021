import { bottomLeftDroneSprite, canvas, laserFromBottomLeftDrone } from "../instances";
import { getRandomLaserColor } from "./independent/getRandomLaserColor";
import { getRandomLaserSize } from "./independent/getRandomLaserSize";

export function updateLaserFromBottomLeftDrone() {
  laserFromBottomLeftDrone.position = bottomLeftDroneSprite.position;
  laserFromBottomLeftDrone.height = -canvas.height;
  laserFromBottomLeftDrone.width = getRandomLaserSize();
  laserFromBottomLeftDrone.color = getRandomLaserColor();
}
