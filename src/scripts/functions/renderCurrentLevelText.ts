import { canvas, getCurrentLevel, renderText } from "../constants";

export function renderCurrentLevelText() {
  renderText(`LEVEL ${getCurrentLevel()}`, canvas.width / 2 - 30, 10, 10, "#fff");
}
