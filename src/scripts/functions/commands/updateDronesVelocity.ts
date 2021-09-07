import { droneSpeed } from "../../constants/config";
import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../../constants/instances";
import { getCatMoving } from "../../constants/stores";

export function updateDronesVelocity() {
  const velocity = getCatMoving() ? droneSpeed : 0;
  topLeftDroneSprite.dy = velocity;
  topRightDroneSprite.dx = -velocity;
  bottomLeftDroneSprite.dx = velocity;
  bottomRightDroneSprite.dy = -velocity;
}
