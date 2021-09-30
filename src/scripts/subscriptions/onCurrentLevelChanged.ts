import { setEscapeTime } from "../constants/stores/escapeTime";
import { onCurrentLevelChanged } from "../constants/stores/currentLevel";
import { resetCurrentLevel } from "../functions/commands/resetCurrentLevel";

onCurrentLevelChanged((level) => {
  resetCurrentLevel();

  if (level === 0) setEscapeTime(0);
});
