import { Sprite } from "kontra";
import { gemsPool, getGemAnimations } from "../constants";

export function addGems(gems: [x: number, y: number][]) {
  gems.forEach(([x, y]) => {
    gemsPool.get({
      x,
      y,
      animations: getGemAnimations(),
      anchor: { x: 0.5, y: 0.5 },
    } as Partial<Sprite>) as Sprite;
  });
}
