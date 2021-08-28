import { collides, GameObject, keyPressed, loadImage, Sprite, SpriteSheet } from "kontra";
import { contain } from "math-fit";
import catSpriteSheet from "../images/catSpriteSheet.webp";
import greenPortalSpriteSheet from "../images/portalSpriteSheet.webp";
import backgroundMusicMidi from "../music/music.json";
import {
  canvas,
  cat,
  catJumpSpeed,
  catSpriteScale,
  catWalkSpeed,
  getFunctionToPlaySound,
  getPlatformWhichCatIsOn,
  getTimeInGame,
  catFallingAcceleration,
  jumpKeys,
  jumpSound,
  moveLeftKeys,
  moveRightKeys,
  platformsPool,
  portalSprite,
  renderText,
  setFunctionToPlaySound,
  setPlatformWhichCatIsOn,
} from "./constants";
import { getZzFX } from "./modules/getZzFX";
import { playMidi } from "./modules/playMidi";

export function resizeCanvas() {
  if (!canvas.parentElement) return;

  const fittingProps = contain(
    { w: canvas.width, h: canvas.height },
    {
      w: canvas.parentElement.clientWidth,
      h: canvas.parentElement.clientHeight,
    }
  );

  canvas.style.marginTop = `${fittingProps.top}px`;
  canvas.style.marginLeft = `${fittingProps.left}px`;
  canvas.style.width = `${fittingProps.width}px`;
  canvas.style.height = `${fittingProps.height}px`;
}

export function isOutOfCanvasBounds(gameObject: GameObject) {
  return gameObject.x > canvas.width || gameObject.y > canvas.height || gameObject.x < 0 || gameObject.y < 0;
}

export function addPlatforms(platforms: [x: number, y: number, width: number, height: number][]) {
  platforms.forEach((platform) => {
    const [x, y, width, height] = platform;
    platformsPool.get({
      x,
      y,
      width,
      height,
      color: "lightgreen",
      anchor: { x: 0.5, y: 0 },
    } as Partial<Sprite>) as Sprite;
  });
}

export async function loadSounds() {
  setFunctionToPlaySound(getZzFX());
  playSound([0]);
}

export function playSound(sound: (number | undefined)[]) {
  getFunctionToPlaySound()?.(...sound);
}

export function handleFirstInteraction() {
  window.removeEventListener("click", handleFirstInteraction);
  window.removeEventListener("keydown", handleFirstInteraction);
  playBackgroundMusic();
  loadSounds();
}

export async function loadCatSpriteSheet() {
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
}

export async function loadPortalSpriteSheet() {
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
}

export function processPortalAnimation() {
  if (
    portalSprite.animations.open &&
    portalSprite.currentAnimation === portalSprite.animations.open &&
    (portalSprite.currentAnimation as unknown as { _f: number })._f === portalSprite.currentAnimation.frames.length - 1
  ) {
    portalSprite.playAnimation("idle");
  }
}

export function updateCatSprite() {
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
    cat.ddy = catFallingAcceleration;
  }

  setPlatformWhichCatIsOn(platformWhichCatIsOn);
}

export function renderTimeInGameText() {
  renderText(getTimeInGame().toFixed(1), portalSprite.x - 12, portalSprite.y - 40, 10, "white");
}

export function playBackgroundMusic() {
  if (import.meta.env.DEV) return;

  const play = () =>
    playMidi(backgroundMusicMidi, () => {
      window.setTimeout(() => {
        play();
      }, 2000);
    });

  play();
}
