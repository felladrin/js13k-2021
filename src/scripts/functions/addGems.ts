import { Sprite } from "kontra";
import { gemsPool, gemsPositionsPerLevel, getCurrentLevel, getGemAnimations } from "../constants";

export function resetGemsFromCurrentLevel() {
  gemsPool.clear();

  gemsPositionsPerLevel[getCurrentLevel()].forEach(([x, y]) => {
    gemsPool.get({
      x,
      y,
      animations: getGemAnimations(),
      anchor: { x: 0.5, y: 0.5 },
    } as Partial<Sprite>) as Sprite;
  });
}
