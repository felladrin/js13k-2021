import { createPubSub, createPubSub as store } from "create-pubsub";
import { initFont, font } from "tinyfont";
import { GameLoop, init, Pool, Sprite } from "kontra";

export const { canvas, context } = init("game");

export const renderText = initFont(font, context);

export const [emitScriptReady, onScriptReady] = createPubSub();

export const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export const [propagateGameLoopRender, onGameLoopRender] = createPubSub();

export const [setTimeInGame, , getTimeInGame] = store(0);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = store<((...sound: any) => void) | null>(null);

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = store<Sprite | null>(null);

export const pickupSound = [, , 1425, , , 0.3, 1, 0.45, , , 476, 0.07, , , , , , 0.99, 0.1];

export const jumpSound = [1.01, , 123, 0.04, 0.03, 0.19, , 0.87, -5, -2, , , , , , , , 0.68, 0.07];

export const catSpriteScale = 2;

export const catWalkSpeed = 2.5;

export const catJumpSpeed = 10;

export const catFallingAcceleration = 0.5;

export const jumpKeys = ["up", "w", "z"];

export const moveLeftKeys = ["left", "a", "q"];

export const moveRightKeys = ["right", "d"];

export const platformsPool = Pool({
  create: Sprite as any,
});

export const cat = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  scaleX: catSpriteScale,
  scaleY: catSpriteScale,
  anchor: { x: 0.5, y: 1 },
});

export const portalSprite = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  anchor: { x: 0.5, y: 0.5 },
});

export const gameLoop = GameLoop({
  update: propagateGameLoopUpdate,
  render: propagateGameLoopRender,
});

export const objectsToAlwaysUpdate = [cat, portalSprite, platformsPool];

export const objectsToAlwaysRender = [cat, portalSprite, platformsPool];

export const backgroundMusicMidi = {
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
