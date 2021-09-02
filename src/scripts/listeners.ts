import {
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  onPortalSpriteSheetImageLoaded,
  onCatSpriteSheetImageLoaded,
  onGemSpriteSheetImageLoaded,
} from "./constants";
import {
  resizeCanvas,
  playBackgroundMusic,
  enableSoundEffects,
  handleGameLoopUpdate,
  handleScriptReady,
  handleGameLoopRender,
  handlePortalSpriteSheetImageLoaded,
  handleGemSpriteSheetImageLoaded,
  handleCatSpriteSheetImageLoaded,
} from "./functions";

window.addEventListener("resize", resizeCanvas);

window.addEventListener("click", enableSoundEffects);

window.addEventListener("click", playBackgroundMusic);

window.addEventListener("keydown", enableSoundEffects);

window.addEventListener("keydown", playBackgroundMusic);

onCatSpriteSheetImageLoaded(handleCatSpriteSheetImageLoaded);

onGemSpriteSheetImageLoaded(handleGemSpriteSheetImageLoaded);

onPortalSpriteSheetImageLoaded(handlePortalSpriteSheetImageLoaded);

onGameLoopUpdate(handleGameLoopUpdate);

onGameLoopRender(handleGameLoopRender);

onScriptReady(handleScriptReady);
