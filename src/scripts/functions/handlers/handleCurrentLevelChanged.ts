import { setEscapeTime } from "../../constants/stores";
import { resetCurrentLevel } from "../commands/resetCurrentLevel";

export function handleCurrentLevelChanged(level: number) {
  resetCurrentLevel();

  if (level === 0) setEscapeTime(0);
}
