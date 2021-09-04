import { setShouldCheckCollisionBetweenCatAndPortal } from "../constants";

export function handleGemsCollectedOnCurrentLevelUpdated(gemsAmount: number) {
  if (gemsAmount >= 3) setShouldCheckCollisionBetweenCatAndPortal(true);
}
