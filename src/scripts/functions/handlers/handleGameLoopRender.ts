import { objectsToAlwaysUpdateAndRender } from "../../constants/instances";
import { renderApertureText } from "../commands/renderApertureText";
import { renderCurrentLevelText } from "../commands/renderCurrentLevelText";
import { renderGameEndText } from "../commands/renderGameEndText";

export function handleGameLoopRender() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.render());
  renderCurrentLevelText();
  renderApertureText();
  renderGameEndText();
}
