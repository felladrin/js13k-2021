import { collides, Sprite } from "kontra";
import { pickupSound } from "../../constants/sounds";
import { gemsPool } from "../../constants/instances";
import {
  getGemsCollectedOnCurrentLevel,
  setGemsCollectedOnCurrentLevel,
} from "../../constants/stores/gemsCollectedOnCurrentLevel";
import { getCatCollisionObject } from "../getters/getCatCollisionObject";
import { playSound } from "./playSound";
import { destroyGem } from "./destroyGem";

export function checkCatCollisionWithGems() {
  (gemsPool.getAliveObjects() as Sprite[])
    .filter((gem) => collides(getCatCollisionObject(), gem))
    .forEach((gem) => {
      destroyGem(gem);
      playSound(pickupSound);
      setGemsCollectedOnCurrentLevel(getGemsCollectedOnCurrentLevel() + 1);
    });
}
