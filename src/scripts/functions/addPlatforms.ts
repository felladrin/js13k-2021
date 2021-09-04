import { Sprite } from "kontra";
import { getPlatformImage, platformsPool } from "../constants";

export function addPlatforms(platforms: [x: number, y: number][]) {
  platforms.forEach(([x, y]) => {
    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>) as Sprite;
  });
}
