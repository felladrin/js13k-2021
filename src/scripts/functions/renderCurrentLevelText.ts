import { canvas, renderText } from "../constants";

export function renderCurrentLevelText() {
  renderText("LEVEL 1", canvas.width / 2 - 30, 10, 10, "#fff");
}
