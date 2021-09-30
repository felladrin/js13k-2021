import { createPubSub as createStore } from "create-pubsub";

export const [setGemsCollectedOnCurrentLevel, onGemsCollectedOnCurrentLevelUpdated, getGemsCollectedOnCurrentLevel] =
  createStore(0);
