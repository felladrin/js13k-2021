import { createPubSub as createStore } from "create-pubsub";
import { Sprite } from "kontra";

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = createStore<Sprite | null>(null);
