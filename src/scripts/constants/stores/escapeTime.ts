import { createPubSub as createStore } from "create-pubsub";

export const [setEscapeTime, onEscapeTimeUpdated, getEscapeTime] = createStore(0);
