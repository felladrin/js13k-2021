import { Sprite } from "kontra";
import { platformsPool } from "../../constants/instances";
import { destroyPlatform } from "./destroyPlatform";
import { isCollidingWithLaser } from "../getters/isCollidingWithLaser";
import { isOutOfLasersBounds } from "../getters/isOutOfLasersBounds";

export function checkPlatformsCollisionWithLasers() {
  for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
    if (isOutOfLasersBounds(platform)) {
      destroyPlatform(platform);
    } else if (
      isCollidingWithLaser({
        world: { x: platform.x - 20 * platform.scaleX, y: platform.y - 4, height: 8, width: 40 * platform.scaleX },
      })
    ) {
      platform.scaleX -= 0.01;

      if (platform.scaleX < 0) destroyPlatform(platform);
    }
  }
}
