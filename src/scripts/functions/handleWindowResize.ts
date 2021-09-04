import { canvas } from "../constants";
import { fitCanvasElementInsideItsParent } from "./fitCanvasElementInsideItsParent";

export function handleWindowResize() {
  fitCanvasElementInsideItsParent(canvas);
}
