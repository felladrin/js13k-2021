import {
  emitScriptReady,
  onCatSpriteSheetImageLoaded,
  onGameButtonClicked,
  onGameLoopRender,
  onGameLoopUpdate,
  onGemSpriteSheetImageLoaded,
  onKeysSpriteSheetImageLoaded,
  onPortalSpriteSheetImageLoaded,
  onScriptReady,
} from "./constants/events";
import { onCurrentLevelChanged, onGemsCollectedOnCurrentLevelUpdated } from "./constants/stores";
import { resetCurrentLevel } from "./functions/commands/resetCurrentLevel";
import { handleCatSpriteSheetImageLoaded } from "./functions/handlers/handleCatSpriteSheetImageLoaded";
import { handleClickOrKeyDownOnWindow } from "./functions/handlers/handleClickOrKeyDownOnWindow";
import { handleGameLoopRender } from "./functions/handlers/handleGameLoopRender";
import { handleGameLoopUpdate } from "./functions/handlers/handleGameLoopUpdate";
import { handleGemsCollectedOnCurrentLevelUpdated } from "./functions/handlers/handleGemsCollectedOnCurrentLevelUpdated";
import { handleGemSpriteSheetImageLoaded } from "./functions/handlers/handleGemSpriteSheetImageLoaded";
import { handleKeysSpriteSheetImageLoaded } from "./functions/handlers/handleKeysSpriteSheetImageLoaded";
import { handlePortalSpriteSheetImageLoaded } from "./functions/handlers/handlePortalSpriteSheetImageLoaded";
import { handleScriptReady } from "./functions/handlers/handleScriptReady";
import { handleWindowResize } from "./functions/handlers/handleWindowResize";

window.addEventListener("resize", handleWindowResize);

window.addEventListener("click", handleClickOrKeyDownOnWindow);

window.addEventListener("keydown", handleClickOrKeyDownOnWindow);

onGameButtonClicked(handleClickOrKeyDownOnWindow);

onCatSpriteSheetImageLoaded(handleCatSpriteSheetImageLoaded);

onGemSpriteSheetImageLoaded(handleGemSpriteSheetImageLoaded);

onPortalSpriteSheetImageLoaded(handlePortalSpriteSheetImageLoaded);

onKeysSpriteSheetImageLoaded(handleKeysSpriteSheetImageLoaded);

onCurrentLevelChanged(resetCurrentLevel);

onGemsCollectedOnCurrentLevelUpdated(handleGemsCollectedOnCurrentLevelUpdated);

onGameLoopUpdate(handleGameLoopUpdate);

onGameLoopRender(handleGameLoopRender);

onScriptReady(handleScriptReady);

if (import.meta.env.DEV) {
  import("./modules/devPanel");
}

emitScriptReady();
