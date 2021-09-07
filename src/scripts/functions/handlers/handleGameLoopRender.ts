import { objectsToAlwaysUpdateAndRender } from "../../constants/instances";
import { renderApertureText } from "../commands/renderApertureText";
import { renderCurrentLevelText } from "../commands/renderCurrentLevelText";

export function handleGameLoopRender() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.render());
  renderCurrentLevelText();
  renderApertureText();
}
