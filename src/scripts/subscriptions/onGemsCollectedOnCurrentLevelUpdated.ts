import { onGemsCollectedOnCurrentLevelUpdated, setShouldCheckCollisionBetweenCatAndPortal } from "../constants/stores";

onGemsCollectedOnCurrentLevelUpdated((gemsAmount) => {
  if (gemsAmount >= 3) setShouldCheckCollisionBetweenCatAndPortal(true);
});
