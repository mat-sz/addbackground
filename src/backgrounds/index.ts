import { bubbles } from './bubbles';
import { ripples } from './ripples';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export type RenderFunctionFactory = (options: RenderOptions) => () => void;

export const backgrounds = {
  bubbles,
  ripples,
};
