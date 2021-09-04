import { collides, GameObject, initKeys, keyPressed, loadImage, Sprite, SpriteSheet } from "kontra";
import { contain } from "math-fit";
import catSpriteSheetUrl from "../images/catSpriteSheet.webp";
import gemSpriteSheetUrl from "../images/gemSpriteSheet.webp";
import platformImageUrl from "../images/platform.webp";
import portalSpriteSheetUrl from "../images/portalSpriteSheet.webp";
import backgroundMusicMidi from "../music/music.json";
import {
  bottomLeftDroneSprite,
  bottomRightDroneSprite,
  canvas,
  catFallingAcceleration,
  catJumpSpeed,
  catSprite,
  catWalkSpeed,
  droneSpeed,
  emitCatSpriteSheetImageLoaded,
  emitGemSpriteSheetImageLoaded,
  emitPlatformImageLoaded,
  emitPortalSpriteSheetImageLoaded,
  gameLoop,
  gemsPool,
  gemsPositionsPerLevel,
  getBackgroundMusicPlaying,
  getCatMoving,
  getCurrentLevel,
  getFunctionToPlaySound,
  getGemAnimations,
  getPlatformImage,
  getPlatformWhichCatIsOn,
  jumpKeys,
  jumpSound,
  laserFromBottomLeftDrone,
  laserFromBottomRightDrone,
  laserFromTopLeftDrone,
  laserFromTopRightDrone,
  moveLeftKeys,
  moveRightKeys,
  objectsToAlwaysRender,
  objectsToAlwaysUpdate,
  pickupSound,
  platformsPool,
  platformsPositionsPerLevel,
  portalSprite,
  renderText,
  setBackgroundMusicPlaying,
  setCatMoving,
  setFunctionToPlaySound,
  setGemAnimations,
  setPlatformWhichCatIsOn,
  topLeftDroneSprite,
  topRightDroneSprite,
} from "./constants";
import { getZzFX } from "./modules/getZzFX";
import { playMidi } from "./modules/playMidi";

export function fitCanvasElementInsideItsParent(canvasElement: HTMLCanvasElement) {
  if (!canvasElement.parentElement) return;

  const fittingParameters = contain(
    { w: canvasElement.width, h: canvasElement.height },
    {
      w: canvasElement.parentElement.clientWidth,
      h: canvasElement.parentElement.clientHeight,
    }
  );

  canvasElement.style.marginTop = `${fittingParameters.top}px`;
  canvasElement.style.marginLeft = `${fittingParameters.left}px`;
  canvasElement.style.width = `${fittingParameters.width}px`;
  canvasElement.style.height = `${fittingParameters.height}px`;
}

function isCollidingWithLaser(gameObject: GameObject) {
  return [laserFromTopRightDrone, laserFromBottomLeftDrone, laserFromBottomRightDrone, laserFromTopLeftDrone].some(
    (laser) => collides(gameObject, laser)
  );
}

function addPlatforms(platforms: [x: number, y: number][]) {
  platforms.forEach(([x, y]) => {
    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>) as Sprite;
  });
}

function checkPlatformsCollisionWithLasers() {
  for (const platform of platformsPool.getAliveObjects() as Sprite[]) {
    if (!isCollidingWithLaser(platform)) continue;

    platform.scaleX -= 0.01;

    if (platform.scaleX <= 0.01) platform.ttl = 0;
  }
}

function addGems(gems: [x: number, y: number][]) {
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

function checkCollisionWithGems() {
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

function processPortalAnimation() {
  if (
    portalSprite.animations.open &&
    portalSprite.currentAnimation === portalSprite.animations.open &&
    (portalSprite.currentAnimation as unknown as { _f: number })._f === portalSprite.currentAnimation.frames.length - 1
  ) {
    portalSprite.playAnimation("idle");
  }
}

function updateCatSprite() {
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

function renderCurrentLevelText() {
  renderText("LEVEL 1", canvas.width / 2 - 30, 10, 10, "#fff");
}

export function playBackgroundMusic() {
  if (getBackgroundMusicPlaying()) return;

  playMidi(backgroundMusicMidi, () => {
    setBackgroundMusicPlaying(false);
  });

  setBackgroundMusicPlaying(true);
}

function getRandomLaserColor() {
  return Math.random() < 0.5 ? "#1A759F" : "#1E6091";
}

function getRandomLaserSize() {
  return Math.random() * 1.5 + 1.5;
}

function updateLaserFromTopLeftDrone() {
  laserFromTopLeftDrone.position = topLeftDroneSprite.position;
  laserFromTopLeftDrone.width = canvas.width;
  laserFromTopLeftDrone.height = getRandomLaserSize();
  laserFromTopLeftDrone.color = getRandomLaserColor();
}

function updateLaserFromTopRightDrone() {
  laserFromTopRightDrone.position = topRightDroneSprite.position;
  laserFromTopRightDrone.height = canvas.height;
  laserFromTopRightDrone.width = getRandomLaserSize();
  laserFromTopRightDrone.color = getRandomLaserColor();
}

function updateLaserFromBottomLeftDrone() {
  laserFromBottomLeftDrone.position = bottomLeftDroneSprite.position;
  laserFromBottomLeftDrone.height = -canvas.height;
  laserFromBottomLeftDrone.width = getRandomLaserSize();
  laserFromBottomLeftDrone.color = getRandomLaserColor();
}

function updateLaserFromBottomRightDrone() {
  laserFromBottomRightDrone.position = bottomRightDroneSprite.position;
  laserFromBottomRightDrone.width = -canvas.width;
  laserFromBottomRightDrone.height = getRandomLaserSize();
  laserFromBottomRightDrone.color = getRandomLaserColor();
}

function updateDronesVelocity() {
  const velocity = getCatMoving() ? droneSpeed : 0;
  topLeftDroneSprite.dy = velocity;
  topRightDroneSprite.dx = -velocity;
  bottomLeftDroneSprite.dx = velocity;
  bottomRightDroneSprite.dy = -velocity;
}

export function handleGameLoopUpdate() {
  objectsToAlwaysUpdate.forEach((object) => object.update());
  processPortalAnimation();
  updateCatSprite();
  checkCollisionWithGems();
  checkPlatformsCollisionWithLasers();
  updateLaserFromTopLeftDrone();
  updateLaserFromBottomLeftDrone();
  updateLaserFromBottomRightDrone();
  updateLaserFromTopRightDrone();
  updateDronesVelocity();
}

export function handleGameLoopRender() {
  objectsToAlwaysRender.forEach((object) => object.render());
  renderCurrentLevelText();
}

export async function handleScriptReady() {
  emitPlatformImageLoaded(await loadImage(platformImageUrl));
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitGemSpriteSheetImageLoaded(await loadImage(gemSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  initKeys();
  fitCanvasElementInsideItsParent(canvas);
  addGems(gemsPositionsPerLevel[getCurrentLevel()]);
  addPlatforms(platformsPositionsPerLevel[getCurrentLevel()]);
  gameLoop.start();
}

export async function loadDevTools() {
  const { Pane } = await import("tweakpane");
  const { initPointer, getPointer } = await import("kontra");

  initPointer();

  const pane = new Pane({ title: "Dev Panel" });

  const kontraFolder = pane.addFolder({ title: "Kontra" });

  const kontraFields = {
    pointer: { x: 0, y: 0 },
  };

  const pointerField = kontraFolder.addInput(kontraFields, "pointer", { disabled: true });

  window.addEventListener("click", () => {
    const { x, y } = getPointer();
    kontraFields.pointer = { x, y };
    pointerField.refresh();
  });
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
