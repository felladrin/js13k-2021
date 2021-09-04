import { getFunctionToPlaySound } from "../constants";

export function playSound(sound: (number | undefined)[]) {
  getFunctionToPlaySound()?.(...sound);
}
