import { getFunctionToPlaySound, setFunctionToPlaySound } from "../../constants/stores/functionToPlaySound";
import { getZzFX } from "../getters/getZzFX";
import { playSound } from "./playSound";

export function enableSoundEffects() {
  if (getFunctionToPlaySound()) return;
  setFunctionToPlaySound(getZzFX());
  playSound([0]);
}
