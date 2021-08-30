import { initKeys, loadImage, SpriteSheet } from "kontra";
import catSpriteSheetUrl from "../images/catSpriteSheet.webp";
import portalSpriteSheetUrl from "../images/portalSpriteSheet.webp";
import platformImageUrl from "../images/platform.webp";
import gemSpriteSheetUrl from "../images/gemSpriteSheet.webp";
import {
  gameLoop,
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  objectsToAlwaysRender,
  objectsToAlwaysUpdate,
  setTimeInGame,
  getTimeInGame,
  emitCatSpriteSheetImageLoaded,
  emitPortalSpriteSheetImageLoaded,
  onPortalSpriteSheetImageLoaded,
  portalSprite,
  onCatSpriteSheetImageLoaded,
  catSprite,
  emitPlatformImageLoaded,
  emitGemSpriteSheetImageLoaded,
  onGemSpriteSheetImageLoaded,
  setGemAnimations,
} from "./constants";
import {
  addPlatforms,
  renderTimeInGameText,
  resizeCanvas,
  processPortalAnimation,
  updateCatSprite,
  playBackgroundMusic,
  enableSoundEffects,
  addGems,
  checkCollisionWithGems,
} from "./functions";

window.addEventListener("resize", resizeCanvas);

["click", "keydown"].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    enableSoundEffects();
    playBackgroundMusic();
  });
});

onCatSpriteSheetImageLoaded((image) => {
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
      // stopped: {
      //   frames: 14,
      // },
    },
  }).animations;
});

onGemSpriteSheetImageLoaded((image) => {
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
});

onPortalSpriteSheetImageLoaded((image) => {
  portalSprite.animations = SpriteSheet({
    image,
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
  }).animations;
});

onGameLoopUpdate((dt) => {
  setTimeInGame(getTimeInGame() + dt);
  objectsToAlwaysUpdate.forEach((object) => object.update());
  processPortalAnimation();
  updateCatSprite();
  checkCollisionWithGems();
});

onGameLoopRender(() => {
  objectsToAlwaysRender.forEach((object) => object.render());
  renderTimeInGameText();
});

onScriptReady(async () => {
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
});
