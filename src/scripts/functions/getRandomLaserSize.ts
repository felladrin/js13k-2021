import { minimumLaserSize } from "../config";

export function getRandomLaserSize() {
  return Math.random() * minimumLaserSize + minimumLaserSize;
}
