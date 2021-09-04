import { collides, Sprite } from "kontra";
import { gemsPool, pickupSound } from "../constants";
import { getCatCollisionObject } from "./getCatCollisionObject";
import { playSound } from "./playSound";

export function checkCollisionWithGems() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (collides(getCatCollisionObject(), gem)) {
      gem.ttl = 0;
      playSound(pickupSound);
    }
  }
}
