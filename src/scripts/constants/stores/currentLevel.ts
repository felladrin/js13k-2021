import { createPubSub as createStore } from "create-pubsub";

export const [setCurrentLevel, onCurrentLevelChanged, getCurrentLevel] = createStore(0);
