import backgroundMusicMidi from "../../music/music.json";
import { getBackgroundMusicPlaying, setBackgroundMusicPlaying } from "../constants";
import { playMidi } from "./playMidi";

export function playBackgroundMusic() {
  if (getBackgroundMusicPlaying()) return;

  playMidi(backgroundMusicMidi, () => {
    setBackgroundMusicPlaying(false);
  });

  setBackgroundMusicPlaying(true);
}
