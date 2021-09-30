import { createDerivedPubSub } from "../../functions/getters/createDerivedPubSub";
import { onGemsCollectedOnCurrentLevelUpdated, getGemsCollectedOnCurrentLevel } from "./gemsCollectedOnCurrentLevel";

export const [, , shouldCheckCollisionBetweenCatAndPortal] = createDerivedPubSub(
  [onGemsCollectedOnCurrentLevelUpdated],
  () => getGemsCollectedOnCurrentLevel() >= 3
);
