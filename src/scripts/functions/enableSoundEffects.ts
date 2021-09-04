import { getFunctionToPlaySound, setFunctionToPlaySound } from "../stores";
import { getZzFX } from "./independent/getZzFX";
import { playSound } from "./playSound";

export function enableSoundEffects() {
  if (getFunctionToPlaySound()) return;
  setFunctionToPlaySound(getZzFX());
  playSound([0]);
}
