import { celadonBlue, lapisLazuli } from "../colors";

export function getRandomLaserColor() {
  return Math.random() < 0.5 ? celadonBlue : lapisLazuli;
}
