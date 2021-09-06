import { objectsToAlwaysUpdateAndRender } from "../instances";
import { renderApertureText } from "./renderApertureText";
import { renderCurrentLevelText } from "./renderCurrentLevelText";

export function handleGameLoopRender() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.render());
  renderCurrentLevelText();
  renderApertureText();
}
