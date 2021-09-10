import { Pane } from "tweakpane";
import { initPointer, getPointer, Sprite, collides } from "kontra";
import { canvas, catSprite, gemsPool, platformsPool } from "../constants/instances";
import { getGemAnimations, getPlatformImage } from "../constants/stores";

initPointer();

const pane = new Pane({ title: "Dev Panel" });

const kontraFolder = pane.addFolder({ title: "Kontra" });

enum OnClickAction {
  DoNothing = "Do Nothing",
  AddPlatform = "Add Platform",
  DelPlatform = "Del Platform",
  AddGem = "Add Gem",
  TeleportCat = "Teleport Cat",
}

const kontraFields = {
  pointer: { x: 0, y: 0 },
  platformPositions: getPlatformPositionsAsString(),
  gemsPositions: getGemsPositionsAsString(),
  onClickAction: OnClickAction.DoNothing,
};

const pointerField = kontraFolder.addInput(kontraFields, "pointer", { disabled: true, label: "Pointer" });

kontraFolder.addMonitor(kontraFields, "platformPositions", { label: "Pla. Pos." });

kontraFolder.addMonitor(kontraFields, "gemsPositions", { label: "Gems Pos." });

kontraFolder.addInput(kontraFields, "onClickAction", {
  label: "On Click",
  options: {
    [OnClickAction.DoNothing]: OnClickAction.DoNothing,
    [OnClickAction.AddPlatform]: OnClickAction.AddPlatform,
    [OnClickAction.DelPlatform]: OnClickAction.DelPlatform,
    [OnClickAction.AddGem]: OnClickAction.AddGem,
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
    case OnClickAction.TeleportCat:
      catSprite.x = x;
      catSprite.y = y;
      break;
  }

  kontraFields.platformPositions = getPlatformPositionsAsString();

  kontraFields.gemsPositions = getGemsPositionsAsString();

  kontraFields.pointer = { x, y };

  pointerField.refresh();
});

setInterval(() => {
  kontraFields.platformPositions = getPlatformPositionsAsString();

  kontraFields.gemsPositions = getGemsPositionsAsString();
}, 1000);

function getPlatformPositionsAsString() {
  return JSON.stringify(
    (platformsPool.getAliveObjects() as Sprite[]).map((platform) => [Math.round(platform.x), Math.round(platform.y)])
  );
}

function getGemsPositionsAsString() {
  return JSON.stringify((gemsPool.getAliveObjects() as Sprite[]).map((gem) => [Math.round(gem.x), Math.round(gem.y)]));
}
