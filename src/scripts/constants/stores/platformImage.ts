import { createPubSub as createStore } from "create-pubsub";

export const [emitPlatformImageLoaded, , getPlatformImage] = createStore<HTMLImageElement>();
