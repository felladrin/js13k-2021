import { collides, GameObject, keyPressed, Sprite } from "kontra";
import { contain } from "math-fit";
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
