declare module "tinyfont" {
  function initFont(
    font: any,
    canvasContext: CanvasRenderingContext2D
  ): (text: string, x?: number, y?: number, size?: number, color?: string) => void;
  let font: any;
}
