import { collides } from "kontra";
import { pickupSound } from "../../constants/sounds";
import { shouldCheckCollisionBetweenCatAndPortal } from "../../constants/stores";
import { advanceToNextLevelIfPossible } from "./advanceToNextLevelIfPossible";
import { getCatCollisionObject } from "../getters/getCatCollisionObject";
import { getPortalCollisionObject } from "../getters/getPortalCollisionObject";
import { playSound } from "./playSound";

export function checkCatCollisionWithPortal() {
  if (shouldCheckCollisionBetweenCatAndPortal() && collides(getCatCollisionObject(), getPortalCollisionObject())) {
    advanceToNextLevelIfPossible();
    playSound(pickupSound);
  }
}