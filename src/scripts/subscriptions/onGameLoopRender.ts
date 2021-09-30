import { onGameLoopRender } from "../constants/events";
import { objectsToAlwaysUpdateAndRender } from "../constants/instances";
import { renderApertureText } from "../functions/commands/renderApertureText";
import { renderCurrentLevelText } from "../functions/commands/renderCurrentLevelText";
import { renderGameEndText } from "../functions/commands/renderGameEndText";

onGameLoopRender(() => {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.render());
  renderCurrentLevelText();
  renderApertureText();
  renderGameEndText();
});
