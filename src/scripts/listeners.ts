import { initKeys, loadImage, SpriteSheet } from "kontra";
import catSpriteSheetUrl from "../images/catSpriteSheet.webp";
import portalSpriteSheetUrl from "../images/portalSpriteSheet.webp";
import platformImageUrl from "../images/platform.webp";
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
} from "./constants";
import {
  addPlatforms,
  renderTimeInGameText,
  resizeCanvas,
  processPortalAnimation,
  updateCatSprite,
  playBackgroundMusic,
  enableSoundEffects,
} from "./functions";

window.addEventListener("resize", resizeCanvas);

["click", "keydown"].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    enableSoundEffects();
    playBackgroundMusic();
  });
});

onCatSpriteSheetImageLoaded((image) => {
  const spriteSheet = SpriteSheet({
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
  });

  catSprite.animations = spriteSheet.animations;
});

onPortalSpriteSheetImageLoaded((image) => {
  const portalSpriteSheet = SpriteSheet({
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
  });

  portalSprite.animations = portalSpriteSheet.animations;
});

onGameLoopUpdate((dt) => {
  setTimeInGame(getTimeInGame() + dt);
  objectsToAlwaysUpdate.forEach((object) => object.update());
  processPortalAnimation();
  updateCatSprite();
});

onGameLoopRender(() => {
  objectsToAlwaysRender.forEach((object) => object.render());
  renderTimeInGameText();
});

onScriptReady(async () => {
  emitPlatformImageLoaded(await loadImage(platformImageUrl));
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  initKeys();
  resizeCanvas();
  addPlatforms([
    [160, 310],
    [100, 250],
    [30, 210],
  ]);
  gameLoop.start();
});
