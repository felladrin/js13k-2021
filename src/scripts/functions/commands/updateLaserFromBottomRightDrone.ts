import { bottomRightDroneSprite, canvas, laserFromBottomRightDrone } from "../../constants/instances";
import { getRandomLaserColor } from "../getters/getRandomLaserColor";
import { getRandomLaserSize } from "../getters/getRandomLaserSize";

export function updateLaserFromBottomRightDrone() {
  laserFromBottomRightDrone.position = bottomRightDroneSprite.position;
  laserFromBottomRightDrone.width = -canvas.width;
  laserFromBottomRightDrone.height = getRandomLaserSize();
  laserFromBottomRightDrone.color = getRandomLaserColor();
}
