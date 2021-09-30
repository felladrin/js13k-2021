import { enableSoundEffects } from "../functions/commands/enableSoundEffects";
import { playBackgroundMusic } from "../functions/commands/playBackgroundMusic";

window.addEventListener("click", () => {
  enableSoundEffects();
  playBackgroundMusic();
});
