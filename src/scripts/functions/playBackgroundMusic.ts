import backgroundMusicMidi from "../../music/music.json";
import { getBackgroundMusicPlaying, setBackgroundMusicPlaying } from "../stores";
import { playMidi } from "./independent/playMidi";

export function playBackgroundMusic() {
  if (getBackgroundMusicPlaying()) return;

  playMidi(backgroundMusicMidi, () => {
    setBackgroundMusicPlaying(false);
  });

  setBackgroundMusicPlaying(true);
}
