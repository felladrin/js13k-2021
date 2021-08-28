import { GameObject, Sprite } from "kontra";
import { contain } from "math-fit";
import { canvas, getFunctionToPlaySound, platformsPool, setFunctionToPlaySound } from "./constants";
import { playMidi } from "./lib/playMidi";
import { getZzFX } from "./lib/getZzFX";

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
