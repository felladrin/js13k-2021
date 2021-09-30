import { keyLime } from "../../constants/colors";
import { platformsPositionsPerLevel } from "../../constants/config";
import { renderText } from "../../constants/instances";
import { getCurrentLevel } from "../../constants/stores/currentLevel";
import { getFormattedEscapeTime } from "../getters/getFormattedEscapeTime";

export function renderGameEndText() {
  if (getCurrentLevel() !== platformsPositionsPerLevel.length - 1) return;

  renderText("CATEGORIC ESCAPE!", 56, 40, 20, keyLime);
  renderText(`TOTAL TIME: ${getFormattedEscapeTime()}`, 60, 85, 20, keyLime);
  renderText(`PLAY AGAIN?`, 110, 198, 15, keyLime);
}
