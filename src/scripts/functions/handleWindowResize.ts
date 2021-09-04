import { canvas } from "../instances";
import { fitCanvasElementInsideItsParent } from "./independent/fitCanvasElementInsideItsParent";

export function handleWindowResize() {
  fitCanvasElementInsideItsParent(canvas);
}
