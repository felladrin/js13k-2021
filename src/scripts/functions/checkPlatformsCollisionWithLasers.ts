import { Sprite } from "kontra";
import { platformsPool } from "../constants";
import { destroyPlatform } from "./destroyPlatform";
import { isCollidingWithLaser } from "./isCollidingWithLaser";

export function checkPlatformsCollisionWithLasers() {
  for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
    if (!isCollidingWithLaser(platform)) continue;

    platform.scaleX -= 0.01;

    if (platform.scaleX < 0) destroyPlatform(platform);
  }
}
