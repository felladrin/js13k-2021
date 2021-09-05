import { yellowGreenCrayola } from "../colors";
import { canvas, renderText } from "../instances";
import { getCurrentLevel } from "../stores";

export function renderCurrentLevelText() {
  renderText(`LEVEL ${getCurrentLevel()}`, canvas.width / 4 - 18, canvas.height - 28, 10, yellowGreenCrayola);
}
