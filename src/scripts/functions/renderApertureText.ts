import { yellowGreenCrayola } from "../colors";
import { apertureSize } from "../config";
import { canvas, renderText } from "../instances";
import { getGemsCollectedOnCurrentLevel } from "../stores";

export function renderApertureText() {
  renderText(
    `APERTURE: ${apertureSize[getGemsCollectedOnCurrentLevel()]}`,
    205,
    canvas.height - 28,
    10,
    yellowGreenCrayola
  );
}
