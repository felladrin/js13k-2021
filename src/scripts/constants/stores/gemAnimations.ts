import { createPubSub as createStore } from "create-pubsub";
import { SpriteSheet } from "kontra";

export const [setGemAnimations, , getGemAnimations] = createStore<SpriteSheet["animations"]>();
