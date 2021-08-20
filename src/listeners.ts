import { collides, initPointer, Sprite, track } from "kontra";
import {
  gameLoop,
  gameObject,
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  objectsToAlwaysRender,
  objectsToAlwaysUpdate,
  onTimeInGameChanged,
  pool,
  setTimeInGame,
  textObject,
  getTimeInGame,
  getSpawnerTime,
  onSpawnerTimeUpdated,
  setSpawnerTime,
} from "./constants";
import { isOutOfCanvasBounds, resizeGame } from "./functions";

window.addEventListener("resize", resizeGame);

onGameLoopUpdate((dt) => {
  objectsToAlwaysUpdate.forEach((object) => object.update(dt));
  setTimeInGame(getTimeInGame() + dt);
  setSpawnerTime(getSpawnerTime() + dt);
});

onGameLoopRender(() => {
  objectsToAlwaysRender.forEach((object) => object.render());
});

onTimeInGameChanged((timeInGame) => {
  textObject.props.text = `TIME: ${timeInGame.toFixed(1)}`;
});

onScriptReady(() => {
  initPointer();
  track(gameObject);
  resizeGame();
  gameLoop.start();
});

onSpawnerTimeUpdated((time) => {
  if (time < 0.1) return;

  const spawned = pool.get({
    x: textObject.x,
    y: textObject.y,
    velocity: gameObject.position
      .subtract(textObject.position)
      .normalize()
      .scale(5),
    width: 4,
    height: 4,
    color: "red",
    props: {
      collided: false,
    },
    update: () => {
      spawned.advance();

      if (isOutOfCanvasBounds(spawned)) {
        spawned.ttl = 0;
      }

      if (spawned.props.collided) {
        spawned.scaleX -= 0.01;
        spawned.scaleY -= 0.01;
        if (spawned.scaleX < 0 || spawned.scaleY < 0) {
          spawned.ttl = 0;
        }
      } else if (collides(spawned, gameObject)) {
        spawned.props.collided = true;
        spawned.dx = -spawned.dx * Math.random();
        spawned.dy = -spawned.dy * Math.random();
        spawned.ddy = 0.1;
      }
    },
  } as Partial<Sprite>) as Sprite;

  setSpawnerTime(0);
});
