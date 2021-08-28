import { initKeys, loadImage, SpriteSheet } from "kontra";
import catSpriteSheetUrl from "../images/catSpriteSheet.webp";
import portalSpriteSheetUrl from "../images/portalSpriteSheet.webp";
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
  cat,
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
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  initKeys();
  resizeCanvas();
  addPlatforms([
    [256, 400, 60, 2],
    [120, 400, 60, 2],
  ]);
  gameLoop.start();
});
