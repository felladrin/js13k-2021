import { yellowGreenCrayola } from "../../constants/colors";
import { canvas, renderText } from "../../constants/instances";
import { getCurrentLevel } from "../../constants/stores/currentLevel";
import { to as convertNumberToString } from "base26";

export function renderCurrentLevelText() {
  const quadrant = convertNumberToString(getCurrentLevel() + 1).toUpperCase();
  renderText(`QUADRANT: ${quadrant}`, canvas.width / 4 - 30, canvas.height - 28, 10, yellowGreenCrayola);
}
