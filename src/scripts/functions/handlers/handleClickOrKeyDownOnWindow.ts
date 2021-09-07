import { enableSoundEffects } from "../commands/enableSoundEffects";
import { playBackgroundMusic } from "../commands/playBackgroundMusic";

export function handleClickOrKeyDownOnWindow() {
  enableSoundEffects();
  playBackgroundMusic();
}
