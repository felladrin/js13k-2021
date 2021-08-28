import { initKeys } from "kontra";
import {
  gameLoop,
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  objectsToAlwaysRender,
  objectsToAlwaysUpdate,
  onTimeInGameChanged,
  setTimeInGame,
  textObject,
  getTimeInGame,
  getSpawnerTime,
  setSpawnerTime,
} from "./constants";
import { addPlatforms, handleFirstInteraction, resizeCanvas } from "./functions";

window.addEventListener("resize", resizeCanvas);

window.addEventListener("click", handleFirstInteraction);

window.addEventListener("keydown", handleFirstInteraction);

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
  initKeys();
  resizeCanvas();
  gameLoop.start();
  addPlatforms([
    [256, 400, 60, 2],
    [120, 400, 60, 2],
  ]);
});
