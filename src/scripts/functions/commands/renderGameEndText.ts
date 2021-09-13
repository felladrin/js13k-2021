import { keyLime } from "../../constants/colors";
import { platformsPositionsPerLevel } from "../../constants/config";
import { renderText } from "../../constants/instances";
import { getCurrentLevel, getEscapeTime } from "../../constants/stores";

export function renderGameEndText() {
  if (getCurrentLevel() !== platformsPositionsPerLevel.length - 1) return;

  const totalTimeInSeconds = getEscapeTime();
  const totalTimeMinutes = Math.floor(totalTimeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const totalTimeSeconds = Math.floor(totalTimeInSeconds % 60)
    .toString()
    .padStart(2, "0");

  renderText("CATEGORIC ESCAPE!", 56, 40, 20, keyLime);
  renderText(`TOTAL TIME: ${totalTimeMinutes}:${totalTimeSeconds}`, 60, 85, 20, keyLime);
  renderText(`PLAY AGAIN?`, 110, 198, 15, keyLime);
}
