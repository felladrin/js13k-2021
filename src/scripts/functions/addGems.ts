import { Sprite } from "kontra";
import { gemsPositionsPerLevel } from "../config";
import { gemsPool } from "../instances";
import { getCurrentLevel, getGemAnimations } from "../stores";

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
