import { canvas, laserFromTopRightDrone, topRightDroneSprite } from "../constants";
import { getRandomLaserColor } from "./getRandomLaserColor";
import { getRandomLaserSize } from "./getRandomLaserSize";

export function updateLaserFromTopRightDrone() {
  laserFromTopRightDrone.position = topRightDroneSprite.position;
  laserFromTopRightDrone.height = canvas.height;
  laserFromTopRightDrone.width = getRandomLaserSize();
  laserFromTopRightDrone.color = getRandomLaserColor();
}
