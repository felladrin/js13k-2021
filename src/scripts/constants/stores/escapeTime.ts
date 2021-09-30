import { createPubSub as createStore } from "create-pubsub";

export const [setEscapeTime, , getEscapeTime] = createStore(0);
