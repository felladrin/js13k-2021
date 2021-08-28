import { GameObject, Sprite, SpriteSheet, loadImage } from "kontra";
import { contain } from "math-fit";
import {
  canvas,
  cat,
  getFunctionToPlaySound,
  getTimeInGame,
  jumpSound,
  platformsPool,
  portalSprite,
  renderText,
  setFunctionToPlaySound,
} from "./constants";
import { playMidi } from "./lib/playMidi";
import { getZzFX } from "./lib/getZzFX";
import catSpriteSheet from "../images/catSpriteSheet.webp";
import greenPortalSpriteSheet from "../images/portalSpriteSheet.webp";

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

export function renderTimeInGameText() {
  renderText(getTimeInGame().toFixed(1), portalSprite.x - 12, portalSprite.y - 40, 10, "white");
}

export function playBackgroundMusic() {
  if (import.meta.env.DEV) return;

  const midiFile = {
    header: {
      formatType: 1,
      trackCount: 1,
      ticksPerBeat: 1392,
    },
    tracks: [
      [
        {
          deltaTime: 0,
          type: "meta",
          subtype: "setTempo",
          microsecondsPerBeat: 1000000,
        },
        ...[
          [0, 62, 101, 1],
          [0, 70, 101, 1],
          [0, 74, 101, 1],
          [120, 74, 0, 0],
          [360, 62, 0, 0],
          [0, 70, 0, 0],
          [0, 74, 98, 1],
          [240, 53, 101, 1],
          [240, 74, 0, 0],
          [240, 53, 0, 0],
          [240, 67, 101, 1],
          [0, 70, 101, 1],
          [120, 70, 0, 0],
          [360, 67, 0, 0],
          [240, 77, 101, 1],
          [480, 77, 0, 0],
          [0, 55, 98, 1],
          [480, 55, 0, 0],
          [240, 53, 98, 1],
          [120, 53, 0, 0],
          [600, 57, 98, 1],
          [240, 53, 101, 1],
          [0, 55, 101, 1],
          [0, 60, 101, 1],
          [240, 57, 0, 0],
          [240, 53, 0, 0],
          [0, 55, 0, 0],
          [0, 60, 0, 0],
          [240, 53, 101, 1],
          [0, 65, 101, 1],
          [0, 69, 101, 1],
          [0, 77, 101, 1],
          [120, 77, 0, 0],
          [360, 53, 0, 0],
          [0, 65, 0, 0],
          [0, 69, 0, 0],
          [240, 69, 101, 1],
          [480, 69, 0, 0],
          [0, 72, 98, 1],
          [120, 72, 0, 0],
          [120, 70, 101, 1],
          [120, 70, 0, 0],
          [360, 57, 98, 1],
          [240, 60, 101, 1],
          [0, 72, 101, 1],
          [120, 72, 0, 0],
          [120, 57, 0, 0],
          [240, 60, 0, 0],
          [0, 69, 98, 1],
          [240, 77, 101, 1],
          [120, 77, 0, 0],
          [120, 69, 0, 0],
          [240, 53, 98, 1],
          [120, 53, 0, 0],
          [120, 62, 101, 1],
          [0, 70, 101, 1],
          [0, 74, 101, 1],
          [480, 62, 0, 0],
          [0, 70, 0, 0],
          [0, 74, 0, 0],
          [0, 72, 98, 1],
          [480, 72, 0, 0],
          [480, 74, 101, 1],
          [480, 74, 0, 0],
          [240, 70, 101, 1],
          [480, 70, 0, 0],
          [240, 53, 101, 1],
          [0, 67, 101, 1],
          [120, 53, 0, 0],
          [360, 67, 0, 0],
          [0, 69, 98, 1],
          [0, 77, 98, 1],
          [240, 65, 101, 1],
          [0, 67, 101, 1],
          [0, 72, 101, 1],
          [240, 69, 0, 0],
          [0, 77, 0, 0],
          [0, 77, 99, 1],
          [240, 65, 0, 0],
          [0, 67, 0, 0],
          [0, 72, 0, 0],
          [0, 53, 98, 1],
          [240, 57, 101, 1],
          [0, 65, 101, 1],
          [0, 77, 101, 1],
          [120, 57, 0, 0],
          [0, 77, 0, 0],
          [120, 53, 0, 0],
          [240, 65, 0, 0],
          [0, 77, 98, 1],
          [120, 77, 0, 0],
          [120, 57, 101, 1],
          [240, 77, 0, 0],
          [0, 67, 99, 1],
          [240, 57, 0, 0],
          [0, 62, 98, 1],
          [0, 67, 0, 0],
          [0, 65, 98, 1],
          [240, 58, 101, 1],
          [240, 62, 0, 0],
          [0, 65, 0, 0],
          [0, 67, 99, 1],
          [240, 58, 0, 0],
          [240, 65, 101, 1],
          [0, 69, 101, 1],
          [0, 77, 101, 1],
          [480, 65, 0, 0],
          [0, 69, 0, 0],
          [0, 77, 0, 0],
          [0, 67, 98, 1],
          [0, 67, 0, 0],
          [0, 70, 98, 1],
          [240, 77, 101, 1],
          [240, 67, 0, 0],
          [0, 70, 0, 0],
          [0, 72, 99, 1],
          [240, 77, 0, 0],
          [240, 53, 101, 1],
          [0, 60, 101, 1],
          [480, 53, 0, 0],
          [0, 60, 0, 0],
          [0, 55, 98, 1],
          [0, 72, 0, 0],
          [0, 69, 98, 1],
          [120, 55, 0, 0],
          [120, 67, 101, 1],
          [240, 69, 0, 0],
          [0, 77, 99, 1],
          [240, 67, 0, 0],
          [480, 77, 0, 0],
          [0, 70, 99, 1],
          [240, 67, 98, 1],
          [0, 70, 0, 0],
          [0, 69, 98, 1],
          [240, 62, 101, 1],
          [0, 72, 101, 1],
          [120, 72, 0, 0],
          [120, 67, 0, 0],
          [0, 69, 0, 0],
          [0, 70, 99, 1],
          [240, 62, 0, 0],
          [240, 53, 101, 1],
          [0, 72, 101, 1],
          [120, 53, 0, 0],
          [0, 72, 0, 0],
          [120, 70, 0, 0],
          [0, 70, 99, 1],
          [240, 74, 98, 1],
          [120, 74, 0, 0],
          [120, 72, 101, 1],
          [240, 70, 0, 0],
          [240, 72, 0, 0],
        ].map((note) => ({
          deltaTime: note[0],
          channel: 0,
          type: "channel",
          noteNumber: note[1],
          velocity: note[2],
          subtype: note[3] ? "noteOn" : "noteOff",
        })),
        {
          deltaTime: 1,
          type: "meta",
          subtype: "endOfTrack",
        },
      ],
    ],
  };
  const replay = () =>
    playMidi(midiFile, () => {
      window.setTimeout(() => {
        replay();
      }, 2000);
    });
  replay();
}
