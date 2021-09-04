import { bottomRightDroneSprite, canvas, laserFromBottomRightDrone } from "../instances";
import { getRandomLaserColor } from "./independent/getRandomLaserColor";
import { getRandomLaserSize } from "./independent/getRandomLaserSize";

export function updateLaserFromBottomRightDrone() {
  laserFromBottomRightDrone.position = bottomRightDroneSprite.position;
  laserFromBottomRightDrone.width = -canvas.width;
  laserFromBottomRightDrone.height = getRandomLaserSize();
  laserFromBottomRightDrone.color = getRandomLaserColor();
}
