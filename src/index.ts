import { backgrounds } from './backgrounds';

export interface BackgroundOptions {
  canvas: HTMLCanvasElement;
  type: keyof typeof backgrounds;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  mouseEffectsEnabled?: boolean;
}

export interface BackgroundControls {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  stop: () => void;
}

export function addBackground({
  canvas,
  type,
  primaryColor = 'rgba(255, 255, 255, 0.2)',
  secondaryColor = 'rgba(0, 0, 0, 0.2)',
  backgroundColor = 'transparent',
  mouseEffectsEnabled = true,
}: BackgroundOptions): BackgroundControls {
  if (!(type in backgrounds)) {
    throw new Error('Unsupported background type.');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to create Context2D.');
  }

  const defaultFillStyle = ctx.fillStyle;
  const defaultStrokeStyle = ctx.strokeStyle;

  const renderFunction = backgrounds[type]({
    canvas,
    ctx,
    primaryColor,
    secondaryColor,
    backgroundColor,
  });

  let playing = true;
  let stopped = false;

  let mouseX: number | undefined = undefined;
  let mouseY: number | undefined = undefined;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  };

  const handleMouseLeave = () => {
    mouseX = undefined;
    mouseY = undefined;
  };

  if (mouseEffectsEnabled) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
  }

  const frame = () => {
    if (stopped) {
      ctx.fillStyle = defaultFillStyle;
      ctx.strokeStyle = defaultStrokeStyle;
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    if (playing) {
      if (backgroundColor === 'transparent') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      renderFunction({ mouseX, mouseY });
    }

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);

  return {
    get isPlaying() {
      return playing;
    },
    setIsPlaying: value => {
      if (stopped) {
        throw new Error('Animation was stopped.');
      }

      playing = value;
    },
    stop: () => {
      playing = false;
      stopped = true;

      if (mouseEffectsEnabled) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    },
  };
}
