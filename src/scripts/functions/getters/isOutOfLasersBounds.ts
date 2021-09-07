import { GameObject } from "kontra";
import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "../../constants/instances";

export function isOutOfLasersBounds(gameObject: GameObject) {
  return (
    gameObject.x > topRightDroneSprite.x ||
    gameObject.y > bottomRightDroneSprite.y ||
    gameObject.x < bottomLeftDroneSprite.x ||
    gameObject.y < topLeftDroneSprite.y
  );
}
