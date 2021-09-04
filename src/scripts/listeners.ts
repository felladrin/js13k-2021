import {
  onGameLoopRender,
  onGameLoopUpdate,
  onScriptReady,
  onPortalSpriteSheetImageLoaded,
  onCatSpriteSheetImageLoaded,
  onGemSpriteSheetImageLoaded,
  onCurrentLevelChanged,
  onGemsCollectedOnCurrentLevelUpdated,
} from "./constants";
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

window.addEventListener("resize", handleWindowResize);

window.addEventListener("click", handleClickOrKeyDownOnWindow);

window.addEventListener("keydown", handleClickOrKeyDownOnWindow);

onCatSpriteSheetImageLoaded(handleCatSpriteSheetImageLoaded);

onGemSpriteSheetImageLoaded(handleGemSpriteSheetImageLoaded);

onPortalSpriteSheetImageLoaded(handlePortalSpriteSheetImageLoaded);

onCurrentLevelChanged(resetCurrentLevel);

onGemsCollectedOnCurrentLevelUpdated(handleGemsCollectedOnCurrentLevelUpdated);

onGameLoopUpdate(handleGameLoopUpdate);

onGameLoopRender(handleGameLoopRender);

onScriptReady(handleScriptReady);
