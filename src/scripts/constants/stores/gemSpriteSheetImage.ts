import { createPubSub } from "create-pubsub";

export const [emitGemSpriteSheetImageLoaded, onGemSpriteSheetImageLoaded, getGemSpriteSheetImage] =
  createPubSub<HTMLImageElement>();
