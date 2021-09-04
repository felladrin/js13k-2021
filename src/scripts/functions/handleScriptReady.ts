import { initKeys, loadImage } from "kontra";
import catSpriteSheetUrl from "../../images/catSpriteSheet.webp";
import gemSpriteSheetUrl from "../../images/gemSpriteSheet.webp";
import platformImageUrl from "../../images/platform.webp";
import portalSpriteSheetUrl from "../../images/portalSpriteSheet.webp";
import {
  canvas,
  emitCatSpriteSheetImageLoaded,
  emitGemSpriteSheetImageLoaded,
  emitPlatformImageLoaded,
  emitPortalSpriteSheetImageLoaded,
  gameLoop,
  gemsPositionsPerLevel,
  getCurrentLevel,
  platformsPositionsPerLevel,
} from "../constants";
import { fitCanvasElementInsideItsParent } from "./fitCanvasElementInsideItsParent";
import { addPlatforms } from "./addPlatforms";
import { addGems } from "./addGems";

export async function handleScriptReady() {
  emitPlatformImageLoaded(await loadImage(platformImageUrl));
  emitCatSpriteSheetImageLoaded(await loadImage(catSpriteSheetUrl));
  emitGemSpriteSheetImageLoaded(await loadImage(gemSpriteSheetUrl));
  emitPortalSpriteSheetImageLoaded(await loadImage(portalSpriteSheetUrl));
  initKeys();
  fitCanvasElementInsideItsParent(canvas);
  addGems(gemsPositionsPerLevel[getCurrentLevel()]);
  addPlatforms(platformsPositionsPerLevel[getCurrentLevel()]);
  gameLoop.start();
}
