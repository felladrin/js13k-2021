import backgroundMusicMidi from "../../../music/music.json";
import { isBackgroundMusicPlaying, setBackgroundMusicPlaying } from "../../constants/stores/backgroundMusicPlaying";
import { playMidi } from "./playMidi";

export function playBackgroundMusic() {
  if (isBackgroundMusicPlaying()) return;

  playMidi(backgroundMusicMidi, () => {
    setBackgroundMusicPlaying(false);
  });

  setBackgroundMusicPlaying(true);
}
