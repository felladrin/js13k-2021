import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, init, Pool, Sprite, keyPressed, collides } from "kontra";
import { playSound } from "./functions";

export const { canvas, context } = init("game");

export const renderText = initFont(font, context);

export const [emitScriptReady, onScriptReady] = createPubSub();

export const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export const [setTimeInGame, , getTimeInGame] = store(0);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = store<((...sound: any) => void) | null>(null);

const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = store<Sprite | null>(null);

export const pickupSound = [, , 1425, , , 0.3, 1, 0.45, , , 476, 0.07, , , , , , 0.99, 0.1];

export const jumpSound = [1.01, , 123, 0.04, 0.03, 0.19, , 0.87, -5, -2, , , , , , , , 0.68, 0.07];

const catSpriteScale = 2;

const catWalkSpeed = 2.5;

const catJumpSpeed = 10;

const gravityAcceleration = 0.5;

const jumpKeys = ["up", "w", "z"];

const moveLeftKeys = ["left", "a", "q"];

const moveRightKeys = ["right", "d"];

export const platformsPool = Pool({
  create: Sprite as any,
});

export const cat = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  scaleX: catSpriteScale,
  scaleY: catSpriteScale,
  anchor: { x: 0.5, y: 1 },
  update: () => {
    cat.advance();

    const requestedJump = jumpKeys.some(keyPressed);
    const isMovingLeft = moveLeftKeys.some(keyPressed);
    const isMovingRight = moveRightKeys.some(keyPressed);

    let platformWhichCatIsOn = getPlatformWhichCatIsOn();

    for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
      if (collides(cat, platform)) {
        platformWhichCatIsOn = platform;
        cat.y = platformWhichCatIsOn.y;
        break;
      }
    }

    cat.scaleX = isMovingLeft ? -catSpriteScale : isMovingRight ? catSpriteScale : cat.scaleX;

    cat.dx = isMovingLeft ? -catWalkSpeed : isMovingRight ? catWalkSpeed : 0;

    if (platformWhichCatIsOn) {
      cat.playAnimation(isMovingLeft || isMovingRight ? "walk" : "idleOne");
    } else {
      cat.playAnimation(cat.dy < 0 ? "jumpTwo" : "falling");
    }

    if (requestedJump && platformWhichCatIsOn) {
      cat.dy = -catJumpSpeed;
      playSound(jumpSound);
      platformWhichCatIsOn = null;
    }

    if (isMovingLeft || isMovingRight) {
      platformWhichCatIsOn = null;
    }

    if (platformWhichCatIsOn) {
      cat.dy = 0;
      cat.ddy = 0;
    } else {
      cat.ddy = gravityAcceleration;
    }

    setPlatformWhichCatIsOn(platformWhichCatIsOn);
  },
});

export const portalSprite = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  scaleX: 1,
  scaleY: 1,
  anchor: { x: 0.5, y: 0.5 },
  update: () => {
    portalSprite.advance();

    if (
      portalSprite.animations.open &&
      portalSprite.currentAnimation === portalSprite.animations.open &&
      (portalSprite.currentAnimation as unknown as { _f: number })._f ===
        portalSprite.currentAnimation.frames.length - 1
    ) {
      portalSprite.playAnimation("idle");
    }
  },
});

export const gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

export const objectsToAlwaysUpdate = [cat, portalSprite, platformsPool];

export const objectsToAlwaysRender = [cat, portalSprite, platformsPool];
