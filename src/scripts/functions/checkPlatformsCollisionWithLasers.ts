import { Sprite } from "kontra";
import { platformsPool } from "../instances";
import { destroyPlatform } from "./destroyPlatform";
import { isCollidingWithLaser } from "./isCollidingWithLaser";
import { isOutOfLasersBounds } from "./isOutOfLasersBounds";

export function checkPlatformsCollisionWithLasers() {
  for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
    if (isOutOfLasersBounds(platform)) {
      destroyPlatform(platform);
    } else if (isCollidingWithLaser(platform)) {
      platform.scaleX -= 0.01;

      if (platform.scaleX < 0) destroyPlatform(platform);
    }
  }
}
