import { backgrounds } from './backgrounds';

export interface BackgroundOptions {
  canvas: HTMLCanvasElement;
  type: keyof typeof backgrounds;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export function addBackground({
  canvas,
  type,
  primaryColor = 'rgba(255, 255, 255, 0.05)',
  secondaryColor = 'rgba(0, 0, 0, 0.05)',
  backgroundColor = 'transparent',
}: BackgroundOptions): void {
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
    primaryColor,
    secondaryColor,
    backgroundColor,
  });

  const frame = () => {
    renderFunction();
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}
