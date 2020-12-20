import { backgrounds } from './backgrounds';

export interface BackgroundOptions {
  canvas: HTMLCanvasElement;
  type: keyof typeof backgrounds;
}

export function addBackground({ canvas, type }: BackgroundOptions): void {
  if (!(type in backgrounds)) {
    throw new Error('Unsupported background type.');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to create Context2D.');
  }

  const renderFunction = backgrounds[type]({
    canvas,
    ctx,
  });

  const frame = () => {
    renderFunction();
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}
