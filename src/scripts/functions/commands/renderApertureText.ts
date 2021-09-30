import { yellowGreenCrayola } from "../../constants/colors";
import { apertureSize } from "../../constants/config";
import { canvas, renderText } from "../../constants/instances";
import { getGemsCollectedOnCurrentLevel } from "../../constants/stores/gemsCollectedOnCurrentLevel";

export function renderApertureText() {
  renderText(
    `APERTURE: ${apertureSize[getGemsCollectedOnCurrentLevel()]}`,
    205,
    canvas.height - 28,
    10,
    yellowGreenCrayola
  );
}
