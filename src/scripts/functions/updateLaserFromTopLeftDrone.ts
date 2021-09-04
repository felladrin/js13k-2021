import { canvas, laserFromTopLeftDrone, topLeftDroneSprite } from "../constants";
import { getRandomLaserColor } from "./getRandomLaserColor";
import { getRandomLaserSize } from "./getRandomLaserSize";

export function updateLaserFromTopLeftDrone() {
  laserFromTopLeftDrone.position = topLeftDroneSprite.position;
  laserFromTopLeftDrone.width = canvas.width;
  laserFromTopLeftDrone.height = getRandomLaserSize();
  laserFromTopLeftDrone.color = getRandomLaserColor();
}