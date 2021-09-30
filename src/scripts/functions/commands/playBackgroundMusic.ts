import backgroundMusicMidi from "../../../music/music.json";
import { isBackgroundMusicPlaying, setBackgroundMusicPlaying } from "../../constants/stores";
import { playMidi } from "./playMidi";

export function playBackgroundMusic() {
  if (isBackgroundMusicPlaying()) return;

  playMidi(backgroundMusicMidi, () => {
    setBackgroundMusicPlaying(false);
  });

  setBackgroundMusicPlaying(true);
}
