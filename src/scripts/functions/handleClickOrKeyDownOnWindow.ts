import { enableSoundEffects } from "./enableSoundEffects";
import { playBackgroundMusic } from "./playBackgroundMusic";

export function handleClickOrKeyDownOnWindow() {
  enableSoundEffects();
  playBackgroundMusic();
}
