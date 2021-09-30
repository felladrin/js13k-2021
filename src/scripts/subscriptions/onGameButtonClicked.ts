import { onGameButtonClicked } from "../constants/events";
import { enableSoundEffects } from "../functions/commands/enableSoundEffects";
import { playBackgroundMusic } from "../functions/commands/playBackgroundMusic";

onGameButtonClicked(() => {
  enableSoundEffects();
  playBackgroundMusic();
});
