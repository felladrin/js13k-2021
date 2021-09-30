import { canvas } from "../constants/instances";
import { fitCanvasInsideItsParent } from "../functions/commands/fitCanvasInsideItsParent";

window.addEventListener("resize", () => {
  fitCanvasInsideItsParent(canvas);
});
