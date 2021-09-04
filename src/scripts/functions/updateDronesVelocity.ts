import { droneSpeed } from "../config";
import { bottomLeftDroneSprite, bottomRightDroneSprite, topLeftDroneSprite, topRightDroneSprite } from "../instances";
import { getCatMoving } from "../stores";

export function updateDronesVelocity() {
  const velocity = getCatMoving() ? droneSpeed : 0;
  topLeftDroneSprite.dy = velocity;
  topRightDroneSprite.dx = -velocity;
  bottomLeftDroneSprite.dx = velocity;
  bottomRightDroneSprite.dy = -velocity;
}
