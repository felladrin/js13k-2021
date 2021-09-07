import { bottomLeftDroneSprite, canvas, laserFromBottomLeftDrone } from "../../constants/instances";
import { getRandomLaserColor } from "../getters/getRandomLaserColor";
import { getRandomLaserSize } from "../getters/getRandomLaserSize";

export function updateLaserFromBottomLeftDrone() {
  laserFromBottomLeftDrone.position = bottomLeftDroneSprite.position;
  laserFromBottomLeftDrone.height = -canvas.height;
  laserFromBottomLeftDrone.width = getRandomLaserSize();
  laserFromBottomLeftDrone.color = getRandomLaserColor();
}
