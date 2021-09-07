import { canvas, laserFromTopLeftDrone, topLeftDroneSprite } from "../../constants/instances";
import { getRandomLaserColor } from "../getters/getRandomLaserColor";
import { getRandomLaserSize } from "../getters/getRandomLaserSize";

export function updateLaserFromTopLeftDrone() {
  laserFromTopLeftDrone.position = topLeftDroneSprite.position;
  laserFromTopLeftDrone.width = canvas.width;
  laserFromTopLeftDrone.height = getRandomLaserSize();
  laserFromTopLeftDrone.color = getRandomLaserColor();
}
