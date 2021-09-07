import { celadonBlue, lapisLazuli } from "../../constants/colors";

export function getRandomLaserColor() {
  return Math.random() < 0.5 ? celadonBlue : lapisLazuli;
}
