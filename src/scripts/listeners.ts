import {
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  onPortalSpriteSheetImageLoaded,
  onCatSpriteSheetImageLoaded,
  onGemSpriteSheetImageLoaded,
} from "./constants";
import {
  handleGameLoopUpdate,
  handleScriptReady,
  handleGameLoopRender,
  handlePortalSpriteSheetImageLoaded,
  handleGemSpriteSheetImageLoaded,
  handleCatSpriteSheetImageLoaded,
  handleWindowResize,
  handleClickOrKeyDownOnWindow,
} from "./functions";

window.addEventListener("resize", handleWindowResize);

window.addEventListener("click", handleClickOrKeyDownOnWindow);

window.addEventListener("keydown", handleClickOrKeyDownOnWindow);

onCatSpriteSheetImageLoaded(handleCatSpriteSheetImageLoaded);

onGemSpriteSheetImageLoaded(handleGemSpriteSheetImageLoaded);

onPortalSpriteSheetImageLoaded(handlePortalSpriteSheetImageLoaded);

onGameLoopUpdate(handleGameLoopUpdate);

onGameLoopRender(handleGameLoopRender);

onScriptReady(handleScriptReady);
