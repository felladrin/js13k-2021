import { Sprite } from "kontra";
import { gemsPool } from "../../constants/instances";
import { isOutOfLasersBounds } from "../getters/isOutOfLasersBounds";
import { destroyGem } from "./destroyGem";

export function checkGemsCollisionWithLasers() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (isOutOfLasersBounds(gem)) destroyGem(gem);
  }
}
