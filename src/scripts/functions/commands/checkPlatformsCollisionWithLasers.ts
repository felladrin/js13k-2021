import { Sprite } from "kontra";
import { platformsPool } from "../../constants/instances";
import { destroyPlatform } from "./destroyPlatform";
import { isCollidingWithLaser } from "../getters/isCollidingWithLaser";
import { isOutOfLasersBounds } from "../getters/isOutOfLasersBounds";

export function checkPlatformsCollisionWithLasers() {
  (platformsPool.getAliveObjects() as Sprite[])
    .filter((platform) => isOutOfLasersBounds(platform))
    .forEach(destroyPlatform);

  (platformsPool.getAliveObjects() as Sprite[])
    .filter((platform) =>
      isCollidingWithLaser({
        world: { x: platform.x - 20 * platform.scaleX, y: platform.y - 4, height: 8, width: 40 * platform.scaleX },
      })
    )
    .forEach((platform) => {
      platform.scaleX -= 0.01;

      if (platform.scaleX < 0) destroyPlatform(platform);
    });
}
