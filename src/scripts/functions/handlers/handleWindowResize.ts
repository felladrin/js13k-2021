import { canvas } from "../../constants/instances";
import { fitCanvasInsideItsParent } from "../commands/fitCanvasInsideItsParent";

export function handleWindowResize() {
  fitCanvasInsideItsParent(canvas);
}
