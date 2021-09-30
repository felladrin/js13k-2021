import { collides, Sprite } from "kontra";
import { pickupSound } from "../../constants/sounds";
import { gemsPool } from "../../constants/instances";
import { getGemsCollectedOnCurrentLevel, setGemsCollectedOnCurrentLevel } from "../../constants/stores";
import { getCatCollisionObject } from "../getters/getCatCollisionObject";
import { playSound } from "./playSound";
import { destroyGem } from "./destroyGem";

export function checkCatCollisionWithGems() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (collides(getCatCollisionObject(), gem)) {
      destroyGem(gem);
      playSound(pickupSound);
      setGemsCollectedOnCurrentLevel(getGemsCollectedOnCurrentLevel() + 1);
    }
  }
}
