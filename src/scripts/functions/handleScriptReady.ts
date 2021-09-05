import { loadImage } from "kontra";
import catSpriteSheetUrl from "../../images/catSpriteSheet.webp";
import gemSpriteSheetUrl from "../../images/gemSpriteSheet.webp";
import platformImageUrl from "../../images/platform.webp";
import portalSpriteSheetUrl from "../../images/portalSpriteSheet.webp";
import keysSpriteSheetUrl from "../../images/keysSpriteSheet.webp";
import { canvas, gameLoop } from "../instances";
import { emitPlatformImageLoaded } from "../stores";
import {
  emitCatSpriteSheetImageLoaded,
  emitGemSpriteSheetImageLoaded,
  emitKeysSpriteSheetImageLoaded,
  emitPortalSpriteSheetImageLoaded,
} from "../events";
import { fitCanvasElementInsideItsParent } from "./independent/fitCanvasElementInsideItsParent";
import { resetCurrentLevel } from "./resetCurrentLevel";

export async function handleScriptReady() {
  emitPlatformImageLoaded(await loadImage(platformImageUrl));
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitGemSpriteSheetImageLoaded(await loadImage(gemSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  emitKeysSpriteSheetImageLoaded(await loadImage(keysSpriteSheetUrl));
  fitCanvasElementInsideItsParent(canvas);
  resetCurrentLevel();
  gameLoop.start();
}
