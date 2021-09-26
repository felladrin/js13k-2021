import { createPubSub as createStore } from "create-pubsub";
import { Sprite, SpriteSheet } from "kontra";

export const [emitPlatformImageLoaded, , getPlatformImage] = createStore<HTMLImageElement>();

export const [setCatMoving, , isCatMoving] = createStore(false);

export const [setBackgroundMusicPlaying, , isBackgroundMusicPlaying] = createStore(false);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = createStore<(...sound: any) => void>();

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = createStore<Sprite | null>(null);

export const [setShouldCheckCollisionBetweenCatAndPortal, , shouldCheckCollisionBetweenCatAndPortal] =
  createStore(false);

export const [setGemsCollectedOnCurrentLevel, onGemsCollectedOnCurrentLevelUpdated, getGemsCollectedOnCurrentLevel] =
  createStore(0);

export const [setGemAnimations, , getGemAnimations] = createStore<SpriteSheet["animations"]>();

export const [setCurrentLevel, onCurrentLevelChanged, getCurrentLevel] = createStore(0);

export const [setEscapeTime, , getEscapeTime] = createStore(0);
