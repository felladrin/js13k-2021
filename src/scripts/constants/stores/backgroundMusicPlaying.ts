import { createPubSub as createStore } from "create-pubsub";

export const [setBackgroundMusicPlaying, , isBackgroundMusicPlaying] = createStore(false);
