import { collides, GameObject, keyPressed, Sprite } from "kontra";
import { contain } from "math-fit";
import backgroundMusicMidi from "../music/music.json";
import {
  canvas,
  catSprite,
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
  setBackgroundMusicPlaying,
  getBackgroundMusicPlaying,
  getPlatformImage,
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

function isOutOfCanvasBounds(gameObject: GameObject) {
  return gameObject.x > canvas.width || gameObject.y > canvas.height || gameObject.x < 0 || gameObject.y < 0;
}

export function addPlatforms(platforms: [x: number, y: number][]) {
  platforms.forEach((platform) => {
    const [x, y] = platform;
    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>) as Sprite;
  });
}

export function enableSoundEffects() {
  if (getFunctionToPlaySound()) return;
  setFunctionToPlaySound(getZzFX());
  playSound([0]);
}

function playSound(sound: (number | undefined)[]) {
  getFunctionToPlaySound()?.(...sound);
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
  const isMovingDown = catSprite.dy > 0;
  const isMovingUp = catSprite.dy < 0;

  let platformWhichCatIsOn = getPlatformWhichCatIsOn();

  for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
    if (isMovingDown && collides(catSprite, platform)) {
      platformWhichCatIsOn = platform;
      catSprite.y = platformWhichCatIsOn.y;
      break;
    }
  }

  catSprite.scaleX = isMovingLeft ? -catSpriteScale : isMovingRight ? catSpriteScale : catSprite.scaleX;

  catSprite.dx = isMovingLeft ? -catWalkSpeed : isMovingRight ? catWalkSpeed : 0;

  if (platformWhichCatIsOn) {
    catSprite.playAnimation(isMovingLeft || isMovingRight ? "walk" : "idle");
  } else {
    catSprite.playAnimation(isMovingUp ? "up" : "down");
  }

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

  setPlatformWhichCatIsOn(platformWhichCatIsOn);

  if (isOutOfCanvasBounds(catSprite)) {
    catSprite.position = portalSprite.position;
  }
}

export function renderTimeInGameText() {
  renderText(getTimeInGame().toFixed(1), portalSprite.x - 12, portalSprite.y - 40, 10, "#fff");
}

export function playBackgroundMusic() {
  if (getBackgroundMusicPlaying()) return;

  playMidi(backgroundMusicMidi, () => {
    setBackgroundMusicPlaying(false);
  });

  setBackgroundMusicPlaying(true);
}
