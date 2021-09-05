import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  canvas,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../instances";

export function resetDronesPositions() {
  topLeftDroneSprite.x = 0;
  topLeftDroneSprite.y = 1;

  topRightDroneSprite.x = canvas.width - 1;
  topRightDroneSprite.y = 0;

  bottomLeftDroneSprite.x = 1;
  bottomLeftDroneSprite.y = canvas.height;

  bottomRightDroneSprite.x = canvas.width;
  bottomRightDroneSprite.y = canvas.height - 50;
}
