import { getFunctionToPlaySound } from "../stores";

export function playSound(sound: (number | undefined)[]) {
  getFunctionToPlaySound()?.(...sound);
}
