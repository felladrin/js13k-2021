import { objectsToAlwaysRender } from "../constants";
import { renderCurrentLevelText } from "./renderCurrentLevelText";

export function handleGameLoopRender() {
  objectsToAlwaysRender.forEach((object) => object.render());
  renderCurrentLevelText();
}
