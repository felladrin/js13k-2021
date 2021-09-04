import { collides } from "kontra";
import { pickupSound } from "../sounds";
import { shouldCheckCollisionBetweenCatAndPortal } from "../stores";
import { advanceToNextLevelIfPossible } from "./advanceToNextLevelIfPossible";
import { getCatCollisionObject } from "./getCatCollisionObject";
import { getPortalCollisionObject } from "./getPortalCollisionObject";
import { playSound } from "./playSound";

export function checkCatCollisionWithPortal() {
  if (shouldCheckCollisionBetweenCatAndPortal() && collides(getCatCollisionObject(), getPortalCollisionObject())) {
    advanceToNextLevelIfPossible();
    playSound(pickupSound);
  }
}
