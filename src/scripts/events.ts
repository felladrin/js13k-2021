import { createPubSub } from "create-pubsub";

export const [emitScriptReady, onScriptReady] = createPubSub();

export const [propagateGameLoopUpdate, onGameLoopUpdate] = createPubSub<number>();

export const [emitCatSpriteSheetImageLoaded, onCatSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitPortalSpriteSheetImageLoaded, onPortalSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [emitGemSpriteSheetImageLoaded, onGemSpriteSheetImageLoaded] = createPubSub<HTMLImageElement>();

export const [propagateGameLoopRender, onGameLoopRender] = createPubSub();
