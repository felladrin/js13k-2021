import { loadImage } from "kontra";
import catSpriteSheetUrl from "../../images/catSpriteSheet.webp";
import gemSpriteSheetUrl from "../../images/gemSpriteSheet.webp";
import keysSpriteSheetUrl from "../../images/keysSpriteSheet.webp";
import platformSpriteUrl from "../../images/platformSprite.webp";
import portalSpriteSheetUrl from "../../images/portalSpriteSheet.webp";
import {
  emitCatSpriteSheetImageLoaded,
  emitKeysSpriteSheetImageLoaded,
  emitPortalSpriteSheetImageLoaded,
} from "../constants/events";
import { canvas, gameLoop } from "../constants/instances";
import { emitGemSpriteSheetImageLoaded, emitPlatformImageLoaded } from "../constants/stores";
import { fitCanvasInsideItsParent } from "../functions/commands/fitCanvasInsideItsParent";
import { resetCurrentLevel } from "../functions/commands/resetCurrentLevel";

window.addEventListener("DOMContentLoaded", async () => {
  emitPlatformImageLoaded(await loadImage(platformSpriteUrl));
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitGemSpriteSheetImageLoaded(await loadImage(gemSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  emitKeysSpriteSheetImageLoaded(await loadImage(keysSpriteSheetUrl));
  fitCanvasInsideItsParent(canvas);
  resetCurrentLevel();
  gameLoop.start();
});
