import { objectsToAlwaysUpdateAndRender } from "../instances";
import { renderCurrentLevelText } from "./renderCurrentLevelText";

export function handleGameLoopRender() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.render());
  renderCurrentLevelText();
}
