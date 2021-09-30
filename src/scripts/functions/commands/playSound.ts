import { getFunctionToPlaySound } from "../../constants/stores/functionToPlaySound";

export function playSound(sound: (number | undefined)[]) {
  getFunctionToPlaySound()?.(...sound);
}
