import { getFunctionToPlaySound, setFunctionToPlaySound } from "../constants";
import { getZzFX } from "./getZzFX";
import { playSound } from "./playSound";

export function enableSoundEffects() {
  if (getFunctionToPlaySound()) return;
  setFunctionToPlaySound(getZzFX());
  playSound([0]);
}
