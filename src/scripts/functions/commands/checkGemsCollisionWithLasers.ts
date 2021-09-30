import { Sprite } from "kontra";
import { gemsPool } from "../../constants/instances";
import { isOutOfLasersBounds } from "../getters/isOutOfLasersBounds";
import { destroyGem } from "./destroyGem";

export function checkGemsCollisionWithLasers() {
  (gemsPool.getAliveObjects() as Sprite[]).filter(isOutOfLasersBounds).forEach(destroyGem);
}
