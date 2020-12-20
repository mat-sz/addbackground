import { bubbles } from './bubbles';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export type RenderFunctionFactory = (options: RenderOptions) => () => void;

export const backgrounds = {
  bubbles: bubbles,
};
