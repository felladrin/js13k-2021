import { Pane } from "tweakpane";
import { initPointer, getPointer } from "kontra";

initPointer();

const pane = new Pane({ title: "Dev Panel" });

const kontraFolder = pane.addFolder({ title: "Kontra" });

const kontraFields = {
  pointer: { x: 0, y: 0 },
};

const pointerField = kontraFolder.addInput(kontraFields, "pointer", { disabled: true });

window.addEventListener("click", () => {
  const { x, y } = getPointer();
  kontraFields.pointer = { x, y };
  pointerField.refresh();
});
