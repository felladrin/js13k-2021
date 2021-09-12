import { Pane } from "tweakpane";
import { initPointer, getPointer, Sprite, collides } from "kontra";
import { canvas, catSprite, gemsPool, platformsPool } from "../constants/instances";
import { getGemAnimations, getPlatformImage } from "../constants/stores";

initPointer();

const devPanel = new Pane({ title: "Dev Panel" });

enum OnClickAction {
  DoNothing = "Do Nothing",
  AddPlatform = "Add Platform",
  DelPlatform = "Del Platform",
  AddGem = "Add Gem",
  DelGem = "Del Gem",
  TeleportCat = "Teleport Cat",
}

const kontraFields = {
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

const lastClickField = devPanel.addInput(kontraFields, "lastClick", { disabled: true, label: "Last Click" });

devPanel.addMonitor(kontraFields, "platformPositions", { label: "Pla. Pos." });

devPanel.addMonitor(kontraFields, "gemsPositions", { label: "Gems Pos." });

devPanel.addInput(kontraFields, "onClickAction", {
  label: "On Click",
  options: {
    [OnClickAction.DoNothing]: OnClickAction.DoNothing,
    [OnClickAction.AddPlatform]: OnClickAction.AddPlatform,
    [OnClickAction.DelPlatform]: OnClickAction.DelPlatform,
    [OnClickAction.AddGem]: OnClickAction.AddGem,
    [OnClickAction.DelGem]: OnClickAction.DelGem,
    [OnClickAction.TeleportCat]: OnClickAction.TeleportCat,
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

      if (foundPlatform) foundPlatform.ttl = 0;
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

      if (foundGem) foundGem.ttl = 0;
      break;
    case OnClickAction.TeleportCat:
      catSprite.x = x;
      catSprite.y = y;
      break;
  }

  kontraFields.lastClick = { x, y };

  lastClickField.refresh();
});
