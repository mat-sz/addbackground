import { backgrounds } from './backgrounds';

export interface BackgroundOptions {
  canvas: HTMLCanvasElement;
  type: keyof typeof backgrounds;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export interface BackgroundControls {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  stop: () => void;
}

export function addBackground({
  canvas,
  type,
  primaryColor = 'rgba(255, 255, 255, 0.05)',
  secondaryColor = 'rgba(0, 0, 0, 0.05)',
  backgroundColor = 'transparent',
}: BackgroundOptions): BackgroundControls {
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

  let playing = true;
  let stopped = false;

  const frame = () => {
    if (stopped) {
      ctx.fillStyle = 'transparent';
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

      renderFunction();
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
    },
  };
}
