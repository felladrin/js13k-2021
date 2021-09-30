import { getFunctionToPlaySound } from "../../constants/stores";

export function playSound(sound: (number | undefined)[]) {
  getFunctionToPlaySound()?.(...sound);
}
