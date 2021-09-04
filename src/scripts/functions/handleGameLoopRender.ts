import { objectsToAlwaysUpdateAndRender } from "../constants";
import { renderCurrentLevelText } from "./renderCurrentLevelText";

export function handleGameLoopRender() {
  objectsToAlwaysUpdateAndRender.forEach((object) => object.render());
  renderCurrentLevelText();
}
