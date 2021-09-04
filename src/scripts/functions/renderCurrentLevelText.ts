import { canvas, renderText } from "../instances";
import { getCurrentLevel } from "../stores";

export function renderCurrentLevelText() {
  renderText(`LEVEL ${getCurrentLevel()}`, canvas.width / 2 - 30, 10, 10, "#fff");
}
