import { collides, keyPressed, Sprite } from "kontra";
import {
  catFallingAcceleration,
  catJumpSpeed,
  catSprite,
  catWalkSpeed,
  getPlatformWhichCatIsOn,
  jumpKeys,
  jumpSound,
  moveLeftKeys,
  moveRightKeys,
  platformsPool,
  setCatMoving,
  setPlatformWhichCatIsOn,
} from "../constants";
import { isCollidingWithLaser } from "./isCollidingWithLaser";
import { getCatCollisionObject } from "./getCatCollisionObject";
import { playSound } from "./playSound";

export function updateCatSprite() {
  const requestedJump = jumpKeys.some(keyPressed);
  const isMovingLeft = moveLeftKeys.some(keyPressed);
  const isMovingRight = moveRightKeys.some(keyPressed);
  const isMovingDown = catSprite.dy > 0;
  const isMovingUp = catSprite.dy < 0;

  let platformWhichCatIsOn = getPlatformWhichCatIsOn();

  for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
    if (isMovingDown && collides(getCatCollisionObject(), platform)) {
      platformWhichCatIsOn = platform;
      catSprite.y = platformWhichCatIsOn.y;
      break;
    }
  }

  catSprite.scaleX = isMovingLeft ? -1 : isMovingRight ? 1 : catSprite.scaleX;

  catSprite.dx = isMovingLeft ? -catWalkSpeed : isMovingRight ? catWalkSpeed : 0;

  catSprite.playAnimation(
    platformWhichCatIsOn ? (isMovingLeft || isMovingRight ? "walk" : "idle") : isMovingUp ? "up" : "down"
  );

  if (requestedJump && platformWhichCatIsOn) {
    catSprite.dy = -catJumpSpeed;
    playSound(jumpSound);
    platformWhichCatIsOn = null;
  }

  if (isMovingLeft || isMovingRight) {
    platformWhichCatIsOn = null;
  }

  if (platformWhichCatIsOn) {
    catSprite.dy = 0;
    catSprite.ddy = 0;
  } else {
    catSprite.ddy = catFallingAcceleration;
  }

  if (isCollidingWithLaser(catSprite)) {
    window.location.reload();
  }

  setPlatformWhichCatIsOn(platformWhichCatIsOn);

  setCatMoving(catSprite.dx !== 0 || catSprite.dy !== 0);
}
