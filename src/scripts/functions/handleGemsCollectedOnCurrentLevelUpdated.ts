import { setShouldCheckCollisionBetweenCatAndPortal } from "../stores";

export function handleGemsCollectedOnCurrentLevelUpdated(gemsAmount: number) {
  if (gemsAmount >= 3) setShouldCheckCollisionBetweenCatAndPortal(true);
}
