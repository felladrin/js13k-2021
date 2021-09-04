import { collides, Sprite } from "kontra";
import { gemsPool, getGemsCollectedOnCurrentLevel, pickupSound, setGemsCollectedOnCurrentLevel } from "../constants";
import { getCatCollisionObject } from "./getCatCollisionObject";
import { playSound } from "./playSound";

export function checkCatCollisionWithGems() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (collides(getCatCollisionObject(), gem)) {
      gem.ttl = 0;
      playSound(pickupSound);
      setGemsCollectedOnCurrentLevel(getGemsCollectedOnCurrentLevel() + 1);
    }
  }
}
