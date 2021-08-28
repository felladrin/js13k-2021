import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, GameObject, init, Pool, Sprite, SpriteSheet, loadImage, keyPressed, collides } from "kontra";
import catSpriteSheet from "../images/catSpriteSheet.webp";
import greenPortalSpriteSheet from "../images/portalSpriteSheet.webp";

export const { canvas, context } = init("game");

export const renderText = initFont(font, context);

export const [emitScriptReady, onScriptReady] = createPubSub();

export const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export const [setSpawnerTime, onSpawnerTimeUpdated, getSpawnerTime] = store(0);

export const [setTimeInGame, onTimeInGameChanged, getTimeInGame] = store(0);

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

(async () => {
  const spriteSheet = SpriteSheet({
    image: await loadImage(catSpriteSheet),
    frameWidth: 32,
    frameHeight: 32,
    animations: {
      idleOne: {
        frames: "0..3",
        frameRate: 8,
      },
      idleTwo: {
        frames: "8..11",
        frameRate: 8,
      },
      idleThree: {
        frames: "16..19",
        frameRate: 8,
      },
      idleFour: {
        frames: "24..27",
        frameRate: 8,
      },
      walk: {
        frames: "32..39",
        frameRate: 30,
      },
      jumpOne: {
        frames: "40..43",
        frameRate: 8,
      },
      jumpTwo: {
        frames: "44..47",
        frameRate: 8,
      },
      rest: {
        frames: "48..51",
        frameRate: 2,
      },
      poke: {
        frames: "56..61",
        frameRate: 8,
      },
      attack: {
        frames: "64..70",
        frameRate: 8,
      },
      scare: {
        frames: "72..79",
        frameRate: 8,
      },
      dragged: {
        frames: "64..65",
        frameRate: 8,
        loop: false,
      },
      falling: {
        frames: "66..70",
        frameRate: 8,
        loop: false,
      },
    },
  });

  cat.animations = spriteSheet.animations;
})();

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

(async () => {
  const portalSpriteSheet = SpriteSheet({
    image: await loadImage(greenPortalSpriteSheet),
    frameWidth: 64,
    frameHeight: 64,
    animations: {
      idle: {
        frames: "0..7",
        frameRate: 12,
      },
      open: {
        frames: "8..15",
        frameRate: 12,
        loop: false,
      },
      close: {
        frames: "16..23",
        frameRate: 12,
        loop: false,
      },
    },
  });

  portalSprite.animations = portalSpriteSheet.animations;
})();

export const textObject = GameObject({
  x: 10,
  y: 10,
  props: {
    text: "TIME: 0",
    color: "white",
    size: 10,
  },
  render: () => {
    renderText(
      textObject.props.text as string,
      textObject.x,
      textObject.y,
      textObject.props.size,
      textObject.props.color
    );
  },
});

export const gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

export const objectsToAlwaysUpdate = [cat, portalSprite, platformsPool];

export const objectsToAlwaysRender = [cat, portalSprite, platformsPool, textObject];
