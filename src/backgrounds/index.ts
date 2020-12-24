import { bubbles } from './bubbles';
import { ripples } from './ripples';
import { triangles } from './triangles';

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export interface RenderArguments {
  mouseX: number | undefined;
  mouseY: number | undefined;
}

export type RenderFunctionFactory = (
  options: RenderOptions
) => (args: RenderArguments) => void;

export const backgrounds = {
  bubbles,
  ripples,
  triangles,
};
