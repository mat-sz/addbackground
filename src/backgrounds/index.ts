import { bubbles } from './bubbles';
import { ripples } from './ripples';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export type RenderFunctionFactory = (options: RenderOptions) => () => void;

export const backgrounds = {
  bubbles,
  ripples,
};
