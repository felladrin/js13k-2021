import { Pane } from "tweakpane";
import { initPointer, getPointer, Sprite, collides } from "kontra";
import { canvas, catSprite, gemsPool, platformsPool } from "../constants/instances";
import { onCurrentLevelChanged, setCurrentLevel } from "../constants/stores/currentLevel";
import { getGemAnimations } from "../constants/stores/gemAnimations";
import { getPlatformImage } from "../constants/stores/platformImage";
import { platformsPositionsPerLevel } from "../constants/config";
import { destroyPlatform } from "../functions/commands/destroyPlatform";
import { destroyGem } from "../functions/commands/destroyGem";

initPointer();

const devPanel = new Pane({ title: "Dev Panel" });

enum OnClickAction {
  DoNothing = "Do Nothing",
  AddPlatform = "Add Platform",
  DelPlatform = "Del Platform",
  AddGem = "Add Gem",
  DelGem = "Del Gem",
  MoveCat = "Move Cat",
  DeleteAll = "Delete All",
}

const kontraFields = {
  level: 0,
  lastClick: { x: 0, y: 0 },
  get platformPositions() {
    return JSON.stringify(
      (platformsPool.getAliveObjects() as Sprite[]).map((platform) => [Math.round(platform.x), Math.round(platform.y)])
    );
  },
  get gemsPositions() {
    return JSON.stringify(
      (gemsPool.getAliveObjects() as Sprite[]).map((gem) => [Math.round(gem.x), Math.round(gem.y)])
    );
  },
  onClickAction: OnClickAction.DoNothing,
};

const levelField = devPanel.addInput(kontraFields, "level", {
  label: "Level",
  step: 1,
  min: 0,
  max: platformsPositionsPerLevel.length - 1,
});

levelField.on("change", ({ value }) => {
  setCurrentLevel(value);
});

onCurrentLevelChanged((level) => {
  kontraFields.level = level;
  levelField.refresh();
});

const lastClickField = devPanel.addInput(kontraFields, "lastClick", { disabled: true, label: "Last Click" });

devPanel.addMonitor(kontraFields, "platformPositions", { label: "Platforms" });

devPanel.addMonitor(kontraFields, "gemsPositions", { label: "Gems" });

devPanel.addInput(kontraFields, "onClickAction", {
  label: "On Click",
  options: {
    [OnClickAction.DoNothing]: OnClickAction.DoNothing,
    [OnClickAction.AddPlatform]: OnClickAction.AddPlatform,
    [OnClickAction.DelPlatform]: OnClickAction.DelPlatform,
    [OnClickAction.AddGem]: OnClickAction.AddGem,
    [OnClickAction.DelGem]: OnClickAction.DelGem,
    [OnClickAction.MoveCat]: OnClickAction.MoveCat,
    [OnClickAction.DeleteAll]: OnClickAction.DeleteAll,
  },
});

canvas.addEventListener("click", () => {
  const { x, y } = getPointer();

  switch (kontraFields.onClickAction) {
    case OnClickAction.AddPlatform:
      platformsPool.get({
        x,
        y,
        image: getPlatformImage(),
        anchor: { x: 0.5, y: 0.4 },
      } as Partial<Sprite>) as Sprite;
      break;
    case OnClickAction.DelPlatform:
      const foundPlatform = (platformsPool.getAliveObjects() as Sprite[]).find((platform) =>
        collides(platform, { world: { x, y, width: 1, height: 1 } })
      );

      if (foundPlatform) destroyPlatform(foundPlatform);
      break;
    case OnClickAction.AddGem:
      gemsPool.get({
        x,
        y,
        animations: getGemAnimations(),
        anchor: { x: 0.5, y: 0.5 },
      } as Partial<Sprite>) as Sprite;
      break;
    case OnClickAction.DelGem:
      const foundGem = (gemsPool.getAliveObjects() as Sprite[]).find((gem) =>
        collides(gem, { world: { x, y, width: 1, height: 1 } })
      );

      if (foundGem) destroyGem(foundGem);
      break;
    case OnClickAction.MoveCat:
      catSprite.x = x;
      catSprite.y = y;
      break;
    case OnClickAction.DeleteAll:
      platformsPool.clear();
      gemsPool.clear();
      catSprite.x = x;
      catSprite.y = y;
      platformsPool.get({
        x,
        y,
        image: getPlatformImage(),
        anchor: { x: 0.5, y: 0.4 },
      } as Partial<Sprite>) as Sprite;
      break;
  }

  kontraFields.lastClick = { x, y };

  lastClickField.refresh();
});
