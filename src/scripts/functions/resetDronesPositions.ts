import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  canvas,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../constants";

export function resetDronesPositions() {
  topLeftDroneSprite.x = 0;
  topLeftDroneSprite.y = 0;

  topRightDroneSprite.x = canvas.width;
  topRightDroneSprite.y = 0;

  bottomLeftDroneSprite.x = 0;
  bottomLeftDroneSprite.y = canvas.height;

  bottomRightDroneSprite.x = canvas.width;
  bottomRightDroneSprite.y = canvas.height;
}
