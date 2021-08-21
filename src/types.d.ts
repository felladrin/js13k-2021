/// <reference types="vite/client" />

declare module "math-fit" {
  function contain(
    targetSize: {
      w: number;
      h: number;
    },
    parentSize: {
      w: number;
      h: number;
    }
  ): {
    left: number;
    top: number;
    width: number;
    height: number;
    scale: number;
  };
}

declare module "tinyfont" {
  function initFont(
    font: any,
    canvasContext: CanvasRenderingContext2D
  ): (text: string, x?: number, y?: number, size?: number, color?: string) => void;
  let font: any;
}

declare module "zzfx" {
  function zzfx(...sound: any): void;
}
