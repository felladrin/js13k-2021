import { collides, Sprite } from "kontra";
import { gemsPool } from "../../constants/instances";
import { pickupSound } from "../../constants/sounds";
import { getGemsCollectedOnCurrentLevel, setGemsCollectedOnCurrentLevel } from "../../constants/stores";
import { getCatCollisionObject } from "../getters/getCatCollisionObject";
import { destroyGem } from "./destroyGem";
import { playSound } from "./playSound";

export function checkCatCollisionWithGems() {
  (gemsPool.getAliveObjects() as Sprite[])
    .filter((gem) => collides(getCatCollisionObject(), gem))
    .forEach((gem) => {
      destroyGem(gem);
      playSound(pickupSound);
      setGemsCollectedOnCurrentLevel(getGemsCollectedOnCurrentLevel() + 1);
    });
}
