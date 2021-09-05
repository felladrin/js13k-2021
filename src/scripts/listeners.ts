import { onCurrentLevelChanged, onGemsCollectedOnCurrentLevelUpdated } from "./stores";
import {
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  onPortalSpriteSheetImageLoaded,
  onCatSpriteSheetImageLoaded,
  onGemSpriteSheetImageLoaded,
  onKeysSpriteSheetImageLoaded,
} from "./events";
import { handleClickOrKeyDownOnWindow } from "./functions/handleClickOrKeyDownOnWindow";
import { handleWindowResize } from "./functions/handleWindowResize";
import { handleCatSpriteSheetImageLoaded } from "./functions/handleCatSpriteSheetImageLoaded";
import { handleGemSpriteSheetImageLoaded } from "./functions/handleGemSpriteSheetImageLoaded";
import { handlePortalSpriteSheetImageLoaded } from "./functions/handlePortalSpriteSheetImageLoaded";
import { handleGameLoopRender } from "./functions/handleGameLoopRender";
import { handleScriptReady } from "./functions/handleScriptReady";
import { handleGameLoopUpdate } from "./functions/handleGameLoopUpdate";
import { resetCurrentLevel } from "./functions/resetCurrentLevel";
import { handleGemsCollectedOnCurrentLevelUpdated } from "./functions/handleGemsCollectedOnCurrentLevelUpdated";
import { handleKeysSpriteSheetImageLoaded } from "./functions/handleKeysSpriteSheetImageLoaded";

window.addEventListener("resize", handleWindowResize);

window.addEventListener("click", handleClickOrKeyDownOnWindow);

window.addEventListener("keydown", handleClickOrKeyDownOnWindow);

onCatSpriteSheetImageLoaded(handleCatSpriteSheetImageLoaded);

onGemSpriteSheetImageLoaded(handleGemSpriteSheetImageLoaded);

onPortalSpriteSheetImageLoaded(handlePortalSpriteSheetImageLoaded);

onKeysSpriteSheetImageLoaded(handleKeysSpriteSheetImageLoaded);

onCurrentLevelChanged(resetCurrentLevel);

onGemsCollectedOnCurrentLevelUpdated(handleGemsCollectedOnCurrentLevelUpdated);

onGameLoopUpdate(handleGameLoopUpdate);

onGameLoopRender(handleGameLoopRender);

onScriptReady(handleScriptReady);
