import { onCurrentLevelChanged, setEscapeTime } from "../constants/stores";
import { resetCurrentLevel } from "../functions/commands/resetCurrentLevel";

onCurrentLevelChanged((level) => {
  resetCurrentLevel();

  if (level === 0) setEscapeTime(0);
});
