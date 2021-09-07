import { minimumLaserSize } from "../../constants/config";

export function getRandomLaserSize() {
  return Math.random() * minimumLaserSize + minimumLaserSize;
}
