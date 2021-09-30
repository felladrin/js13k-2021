import { createPubSub as createStore } from "create-pubsub";

export const [setCatMoving, , isCatMoving] = createStore(false);
