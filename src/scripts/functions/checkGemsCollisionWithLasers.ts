import { Sprite } from "kontra";
import { gemsPool } from "../instances";
import { isOutOfLasersBounds } from "./isOutOfLasersBounds";

export function checkGemsCollisionWithLasers() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (isOutOfLasersBounds(gem)) {
      gem.ttl = 0;
    }
  }
}
