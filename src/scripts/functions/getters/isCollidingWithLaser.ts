import { collides } from "kontra";
import {
  laserFromBottomLeftDrone,
  laserFromBottomRightDrone,
  laserFromTopLeftDrone,
  laserFromTopRightDrone,
} from "../../constants/instances";

export function isCollidingWithLaser(
  gameObject:
    | {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | {
        world: {
          x: number;
          y: number;
          width: number;
          height: number;
        };
      }
) {
  return [laserFromTopRightDrone, laserFromBottomLeftDrone, laserFromBottomRightDrone, laserFromTopLeftDrone].some(
    (laser) => collides(gameObject, laser)
  );
}
