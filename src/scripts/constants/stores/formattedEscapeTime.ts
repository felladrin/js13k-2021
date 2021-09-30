import { getEscapeTime, onEscapeTimeUpdated } from "./escapeTime";
import { createDerivedPubSub } from "../../functions/getters/createDerivedPubSub";

export const [, , getFormattedEscapeTime] = createDerivedPubSub([onEscapeTimeUpdated], () => {
  const totalTimeInSeconds = getEscapeTime();
  const totalTimeMinutes = Math.floor(totalTimeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const totalTimeSeconds = Math.floor(totalTimeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${totalTimeMinutes}:${totalTimeSeconds}`;
});
