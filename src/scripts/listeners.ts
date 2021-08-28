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
} from "./constants";
import {
  addPlatforms,
  handleFirstInteraction,
  loadCatSpriteSheet,
  loadPortalSpriteSheet,
  resizeCanvas,
} from "./functions";

window.addEventListener("resize", resizeCanvas);

window.addEventListener("click", handleFirstInteraction);

window.addEventListener("keydown", handleFirstInteraction);

onGameLoopUpdate((dt) => {
  objectsToAlwaysUpdate.forEach((object) => object.update(dt));
  setTimeInGame(getTimeInGame() + dt);
});

onGameLoopRender(() => {
  objectsToAlwaysRender.forEach((object) => object.render());
});

onTimeInGameChanged((timeInGame) => {
  textObject.props.text = timeInGame.toFixed(1);
});

onScriptReady(async () => {
  initKeys();
  resizeCanvas();
  addPlatforms([
    [256, 400, 60, 2],
    [120, 400, 60, 2],
  ]);
  await loadCatSpriteSheet();
  await loadPortalSpriteSheet();
  gameLoop.start();
});
