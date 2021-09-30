import { Sprite } from "kontra";
import { gemsPositionsPerLevel } from "../../constants/config";
import { gemsPool } from "../../constants/instances";
import { getCurrentLevel } from "../../constants/stores/currentLevel";
import { getGemAnimations } from "../../constants/stores/gemAnimations";

export function resetGems() {
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
