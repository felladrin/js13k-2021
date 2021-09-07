import { maximumLaserY } from "../../constants/config";
import { laserFromTopRightDrone, topRightDroneSprite } from "../../constants/instances";
import { getRandomLaserColor } from "../getters/getRandomLaserColor";
import { getRandomLaserSize } from "../getters/getRandomLaserSize";

export function updateLaserFromTopRightDrone() {
  laserFromTopRightDrone.position = topRightDroneSprite.position;
  laserFromTopRightDrone.height = maximumLaserY;
  laserFromTopRightDrone.width = getRandomLaserSize();
  laserFromTopRightDrone.color = getRandomLaserColor();
}
