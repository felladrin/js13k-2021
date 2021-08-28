import { initKeys } from "kontra";
import {
  gameLoop,
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  objectsToAlwaysRender,
  objectsToAlwaysUpdate,
  setTimeInGame,
  getTimeInGame,
} from "./constants";
import {
  addPlatforms,
  handleFirstInteraction,
  loadCatSpriteSheet,
  loadPortalSpriteSheet,
  renderTimeInGameText,
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
  renderTimeInGameText();
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
