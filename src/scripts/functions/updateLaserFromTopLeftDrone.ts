import { canvas, laserFromTopLeftDrone, topLeftDroneSprite } from "../instances";
import { getRandomLaserColor } from "./independent/getRandomLaserColor";
import { getRandomLaserSize } from "./independent/getRandomLaserSize";

export function updateLaserFromTopLeftDrone() {
  laserFromTopLeftDrone.position = topLeftDroneSprite.position;
  laserFromTopLeftDrone.width = canvas.width;
  laserFromTopLeftDrone.height = getRandomLaserSize();
  laserFromTopLeftDrone.color = getRandomLaserColor();
}
