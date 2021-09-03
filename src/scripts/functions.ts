import { collides, GameObject, keyPressed, Sprite, initKeys, loadImage, SpriteSheet } from "kontra";
import { contain } from "math-fit";
import backgroundMusicMidi from "../music/music.json";
import {
  canvas,
  catSprite,
  catJumpSpeed,
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
  gemsPool,
  getGemAnimations,
  pickupSound,
  laserFromTopRightDrone,
  laserFromBottomLeftDrone,
  laserFromBottomRightDrone,
  laserFromTopLeftDrone,
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  topLeftDroneSprite,
  topRightDroneSprite,
  setTimeInGame,
  objectsToAlwaysUpdate,
  emitCatSpriteSheetImageLoaded,
  emitGemSpriteSheetImageLoaded,
  emitPlatformImageLoaded,
  emitPortalSpriteSheetImageLoaded,
  gameLoop,
  objectsToAlwaysRender,
  setGemAnimations,
  setCatMoving,
  getCatMoving,
} from "./constants";
import { getZzFX } from "./modules/getZzFX";
import { playMidi } from "./modules/playMidi";
import catSpriteSheetUrl from "../images/catSpriteSheet.webp";
import portalSpriteSheetUrl from "../images/portalSpriteSheet.webp";
import platformImageUrl from "../images/platform.webp";
import gemSpriteSheetUrl from "../images/gemSpriteSheet.webp";

export function resizeCanvas() {
  const { width, height, parentElement, style } = canvas;

  if (!parentElement) return;

  const fittingProps = contain(
    { w: width, h: height },
    {
      w: parentElement.clientWidth,
      h: parentElement.clientHeight,
    }
  );

  style.marginTop = `${fittingProps.top}px`;
  style.marginLeft = `${fittingProps.left}px`;
  style.width = `${fittingProps.width}px`;
  style.height = `${fittingProps.height}px`;
}

function isCollidingWithLaser(gameObject: GameObject) {
  return [laserFromTopRightDrone, laserFromBottomLeftDrone, laserFromBottomRightDrone, laserFromTopLeftDrone].some(
    (laser) => collides(gameObject, laser)
  );
}

export function addPlatforms(platforms: [x: number, y: number][]) {
  platforms.forEach(([x, y]) => {
    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>) as Sprite;
  });
}

export function addGems(gems: [x: number, y: number][]) {
  gems.forEach(([x, y]) => {
    gemsPool.get({
      x,
      y,
      animations: getGemAnimations(),
      anchor: { x: 0.5, y: 0.5 },
    } as Partial<Sprite>) as Sprite;
  });
}

function getCatCollisionObject() {
  return { world: { x: catSprite.x, y: catSprite.y - catSprite.height, height: catSprite.height, width: 1 } };
}

export function checkCollisionWithGems() {
  for (const gem of gemsPool.getAliveObjects() as Sprite[]) {
    if (collides(getCatCollisionObject(), gem)) {
      gem.ttl = 0;
      playSound(pickupSound);
    }
  }
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
    if (isMovingDown && collides(getCatCollisionObject(), platform)) {
      platformWhichCatIsOn = platform;
      catSprite.y = platformWhichCatIsOn.y;
      break;
    }
  }

  catSprite.scaleX = isMovingLeft ? -1 : isMovingRight ? 1 : catSprite.scaleX;

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

  if (isCollidingWithLaser(catSprite)) {
    window.location.reload();
  }

  setCatMoving(catSprite.dx !== 0 || catSprite.dy !== 0);
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

function randomLaserColor() {
  return Math.random() < 0.5 ? "#CC3333" : "brown";
}

function randomLaserSize() {
  return Math.random() * 1.4 + 1.5;
}

function updateLaserFromTopLeftDrone() {
  laserFromTopLeftDrone.position = topLeftDroneSprite.position;
  laserFromTopLeftDrone.width = canvas.width;
  laserFromTopLeftDrone.height = randomLaserSize();
  laserFromTopLeftDrone.color = randomLaserColor();
}

function updateLaserFromTopRightDrone() {
  laserFromTopRightDrone.position = topRightDroneSprite.position;
  laserFromTopRightDrone.height = canvas.height;
  laserFromTopRightDrone.width = randomLaserSize();
  laserFromTopRightDrone.color = randomLaserColor();
}

function updateLaserFromBottomLeftDrone() {
  laserFromBottomLeftDrone.position = bottomLeftDroneSprite.position;
  laserFromBottomLeftDrone.height = -canvas.height;
  laserFromBottomLeftDrone.width = randomLaserSize();
  laserFromBottomLeftDrone.color = randomLaserColor();
}

function updateLaserFromBottomRightDrone() {
  laserFromBottomRightDrone.position = bottomRightDroneSprite.position;
  laserFromBottomRightDrone.width = -canvas.width;
  laserFromBottomRightDrone.height = randomLaserSize();
  laserFromBottomRightDrone.color = randomLaserColor();
}

export function updateDronesVelocity() {
  const velocity = getCatMoving() ? 0.2 : 0;
  topLeftDroneSprite.dy = velocity;
  topRightDroneSprite.dx = -velocity;
  bottomLeftDroneSprite.dx = velocity;
  bottomRightDroneSprite.dy = -velocity;
}

export function handleGameLoopUpdate(dt: number) {
  setTimeInGame(getTimeInGame() + dt);
  objectsToAlwaysUpdate.forEach((object) => object.update());
  processPortalAnimation();
  updateCatSprite();
  checkCollisionWithGems();
  updateLaserFromTopLeftDrone();
  updateLaserFromBottomLeftDrone();
  updateLaserFromBottomRightDrone();
  updateLaserFromTopRightDrone();
  updateDronesVelocity();
}

export function handleGameLoopRender() {
  objectsToAlwaysRender.forEach((object) => object.render());
  renderTimeInGameText();
}

export async function handleScriptReady() {
  emitPlatformImageLoaded(await loadImage(platformImageUrl));
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitGemSpriteSheetImageLoaded(await loadImage(gemSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  initKeys();
  resizeCanvas();
  addPlatforms([
    [160, 310],
    [100, 250],
    [30, 210],
  ]);
  addGems([
    [160, 295],
    [100, 235],
    [30, 195],
  ]);
  gameLoop.start();
}

export function handlePortalSpriteSheetImageLoaded(image: HTMLImageElement) {
  portalSprite.animations = SpriteSheet({
    image,
    frameWidth: 64,
    frameHeight: 64,
    animations: {
      idle: {
        frames: "0..7",
        frameRate: 10,
      },
      open: {
        frames: "12..8",
        frameRate: 8,
        loop: false,
      },
      close: {
        frames: "8..14",
        frameRate: 8,
        loop: false,
      },
    },
  }).animations;
}

export function handleGemSpriteSheetImageLoaded(image: HTMLImageElement) {
  setGemAnimations(
    SpriteSheet({
      image,
      frameWidth: 16,
      frameHeight: 16,
      animations: {
        idle: {
          frames: "0..3",
          frameRate: 5,
        },
      },
    }).animations
  );
}

export function handleCatSpriteSheetImageLoaded(image: HTMLImageElement) {
  catSprite.animations = SpriteSheet({
    image,
    frameWidth: 18,
    frameHeight: 18,
    animations: {
      idle: {
        frames: "0..3",
        frameRate: 8,
      },
      walk: {
        frames: "4..11",
        frameRate: 20,
      },
      up: {
        frames: 12,
      },
      down: {
        frames: 13,
      },
    },
  }).animations;
}
