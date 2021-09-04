import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  droneSpeed,
  getCatMoving,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../constants";

export function updateDronesVelocity() {
  const velocity = getCatMoving() ? droneSpeed : 0;
  topLeftDroneSprite.dy = velocity;
  topRightDroneSprite.dx = -velocity;
  bottomLeftDroneSprite.dx = velocity;
  bottomRightDroneSprite.dy = -velocity;
}
