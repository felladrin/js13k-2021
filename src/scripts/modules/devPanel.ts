import { collides, getPointer, initPointer, Sprite } from "kontra";
import { Pane } from "tweakpane";
import { platformsPositionsPerLevel } from "../constants/config";
import { canvas, catSprite, gemsPool, platformsPool } from "../constants/instances";
import { getPlatformImage, onCurrentLevelChanged, setCurrentLevel } from "../constants/stores";
import { destroyGem } from "../functions/commands/destroyGem";
import { destroyPlatform } from "../functions/commands/destroyPlatform";
import { getGemAnimations } from "../functions/getters/getGemAnimations";

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

const actions = {
  [OnClickAction.DoNothing]: () => {},
  [OnClickAction.AddPlatform]: () => {
    const { x, y } = getPointer();

    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>);
  },
  [OnClickAction.DelPlatform]: () => {
    const { x, y } = getPointer();

    const foundPlatform = (platformsPool.getAliveObjects() as Sprite[]).find((platform) =>
      collides(platform, { world: { x, y, width: 1, height: 1 } })
    );

    if (foundPlatform) destroyPlatform(foundPlatform);
  },
  [OnClickAction.AddGem]: () => {
    const { x, y } = getPointer();

    gemsPool.get({
      x,
      y,
      animations: getGemAnimations(),
      anchor: { x: 0.5, y: 0.5 },
    } as Partial<Sprite>);
  },
  [OnClickAction.DelGem]: () => {
    const { x, y } = getPointer();

    const foundGem = (gemsPool.getAliveObjects() as Sprite[]).find((gem) =>
      collides(gem, { world: { x, y, width: 1, height: 1 } })
    );

    if (foundGem) destroyGem(foundGem);
  },
  [OnClickAction.MoveCat]: () => {
    const { x, y } = getPointer();
    catSprite.x = x;
    catSprite.y = y;
  },
  [OnClickAction.DeleteAll]: () => {
    const { x, y } = getPointer();
    platformsPool.clear();
    gemsPool.clear();
    catSprite.x = x;
    catSprite.y = y;
    platformsPool.get({
      x,
      y,
      image: getPlatformImage(),
      anchor: { x: 0.5, y: 0.4 },
    } as Partial<Sprite>);
  },
}

canvas.addEventListener("click", () => {
  const { x, y } = getPointer();

  actions[kontraFields.onClickAction]();

  kontraFields.lastClick = { x, y };

  lastClickField.refresh();
});
