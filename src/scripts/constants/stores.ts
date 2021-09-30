import { createPubSub as createStore } from "create-pubsub";

export const [setBackgroundMusicPlaying, , isBackgroundMusicPlaying] = createStore(false);

export const [setCatMoving, , isCatMoving] = createStore(false);

export const [setCurrentLevel, onCurrentLevelChanged, getCurrentLevel] = createStore(0);

export const [setEscapeTime, , getEscapeTime] = createStore(0);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = createStore<(...sound: any) => void>();

export const [setGemsCollectedOnCurrentLevel, , getGemsCollectedOnCurrentLevel] =
  createStore(0);

export const [emitGemSpriteSheetImageLoaded, , getGemSpriteSheetImage] =
  createStore<HTMLImageElement>();

export const [emitPlatformImageLoaded, , getPlatformImage] = createStore<HTMLImageElement>();

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = createStore<import("kontra").Sprite | null>(null);
