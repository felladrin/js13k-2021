import {
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  onPortalSpriteSheetImageLoaded,
  onCatSpriteSheetImageLoaded,
  onGemSpriteSheetImageLoaded,
} from "./constants";
import { handleClickOrKeyDownOnWindow } from "./functions/handleClickOrKeyDownOnWindow";
import { handleWindowResize } from "./functions/handleWindowResize";
import { handleCatSpriteSheetImageLoaded } from "./functions/handleCatSpriteSheetImageLoaded";
import { handleGemSpriteSheetImageLoaded } from "./functions/handleGemSpriteSheetImageLoaded";
import { handlePortalSpriteSheetImageLoaded } from "./functions/handlePortalSpriteSheetImageLoaded";
import { handleGameLoopRender } from "./functions/handleGameLoopRender";
import { handleScriptReady } from "./functions/handleScriptReady";
import { handleGameLoopUpdate } from "./functions/handleGameLoopUpdate";

window.addEventListener("resize", handleWindowResize);

window.addEventListener("click", handleClickOrKeyDownOnWindow);

window.addEventListener("keydown", handleClickOrKeyDownOnWindow);

onCatSpriteSheetImageLoaded(handleCatSpriteSheetImageLoaded);

onGemSpriteSheetImageLoaded(handleGemSpriteSheetImageLoaded);

onPortalSpriteSheetImageLoaded(handlePortalSpriteSheetImageLoaded);

onGameLoopUpdate(handleGameLoopUpdate);

onGameLoopRender(handleGameLoopRender);

onScriptReady(handleScriptReady);
