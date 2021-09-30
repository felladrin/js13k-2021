import { createPubSub as createStore } from "create-pubsub";
import { Sprite, SpriteSheet } from "kontra";
import { createDerivedPubSub } from "../functions/getters/createDerivedPubSub";

export const [emitPlatformImageLoaded, , getPlatformImage] = createStore<HTMLImageElement>();

export const [setCatMoving, , isCatMoving] = createStore(false);

export const [setBackgroundMusicPlaying, , isBackgroundMusicPlaying] = createStore(false);

export const [setFunctionToPlaySound, , getFunctionToPlaySound] = createStore<(...sound: any) => void>();

export const [setPlatformWhichCatIsOn, , getPlatformWhichCatIsOn] = createStore<Sprite | null>(null);

export const [setGemsCollectedOnCurrentLevel, onGemsCollectedOnCurrentLevelUpdated, getGemsCollectedOnCurrentLevel] =
  createStore(0);

export const [, , shouldCheckCollisionBetweenCatAndPortal] = createDerivedPubSub(
  [onGemsCollectedOnCurrentLevelUpdated],
  () => getGemsCollectedOnCurrentLevel() >= 3
);

export const [setGemAnimations, , getGemAnimations] = createStore<SpriteSheet["animations"]>();

export const [setCurrentLevel, onCurrentLevelChanged, getCurrentLevel] = createStore(0);

export const [setEscapeTime, , getEscapeTime] = createStore(0);
