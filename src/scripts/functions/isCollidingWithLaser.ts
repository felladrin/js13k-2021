import { collides, GameObject } from "kontra";
import {
  laserFromBottomLeftDrone,
  laserFromBottomRightDrone,
  laserFromTopLeftDrone,
  laserFromTopRightDrone,
} from "../constants";

export function isCollidingWithLaser(gameObject: GameObject) {
  return [laserFromTopRightDrone, laserFromBottomLeftDrone, laserFromBottomRightDrone, laserFromTopLeftDrone].some(
    (laser) => collides(gameObject, laser)
  );
}
