import { droneSpeed } from "../../constants/config";
import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../../constants/instances";
import { isCatMoving } from "../../constants/stores";

export function updateDronesVelocity() {
  const speed = isCatMoving() ? droneSpeed : 0;
  topLeftDroneSprite.dy = speed;
  topRightDroneSprite.dx = -speed;
  bottomLeftDroneSprite.dx = speed;
  bottomRightDroneSprite.dy = -speed;
}
