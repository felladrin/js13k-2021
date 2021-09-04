import { collides, Sprite } from "kontra";
import { pickupSound } from "../sounds";
import { gemsPool } from "../instances";
import { getGemsCollectedOnCurrentLevel, setGemsCollectedOnCurrentLevel } from "../stores";
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
