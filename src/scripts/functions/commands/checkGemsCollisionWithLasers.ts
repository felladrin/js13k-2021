import { Sprite } from "kontra";
import { gemsPool } from "../../constants/instances";
import { isOutOfLasersBounds } from "../getters/isOutOfLasersBounds";

export function checkGemsCollisionWithLasers() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (isOutOfLasersBounds(gem)) {
      gem.ttl = 0;
    }
  }
}
