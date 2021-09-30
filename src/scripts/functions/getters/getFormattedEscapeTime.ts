import { getEscapeTime } from "../../constants/stores";

export function getFormattedEscapeTime() {
  const totalTimeInSeconds = getEscapeTime();
  const totalTimeMinutes = Math.floor(totalTimeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const totalTimeSeconds = Math.floor(totalTimeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${totalTimeMinutes}:${totalTimeSeconds}`;
}
