import { collides, keyPressed, Sprite } from "kontra";
import { catFallingAcceleration, catJumpSpeed, catWalkSpeed, jumpKeys, moveLeftKeys, moveRightKeys } from "../config";
import { jumpSound } from "../sounds";
import { catSprite, leftKeyButton, platformsPool, rightKeyButton, upKeyButton } from "../instances";
import { getPlatformWhichCatIsOn, setCatMoving, setPlatformWhichCatIsOn } from "../stores";
import { isCollidingWithLaser } from "./isCollidingWithLaser";
import { getCatCollisionObject } from "./getCatCollisionObject";
import { playSound } from "./playSound";
import { resetCurrentLevel } from "./resetCurrentLevel";
import { isOutOfLasersBounds } from "./isOutOfLasersBounds";

export function updateCatSprite() {
  const requestedJump = jumpKeys.some(keyPressed) || upKeyButton.pressed;
  const isMovingLeft = moveLeftKeys.some(keyPressed) || leftKeyButton.pressed;
  const isMovingRight = moveRightKeys.some(keyPressed) || rightKeyButton.pressed;
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

  if (isCollidingWithLaser(catSprite) || isOutOfLasersBounds(catSprite)) {
    resetCurrentLevel();
  }

  setPlatformWhichCatIsOn(platformWhichCatIsOn);

  setCatMoving(catSprite.dx !== 0 || catSprite.dy !== 0);
}
