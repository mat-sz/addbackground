import { RenderFunctionFactory, RenderOptions } from '.';

export const ripples: RenderFunctionFactory = ({
  canvas,
  ctx,
  primaryColor,
}: RenderOptions) => {
  let particles: {
    x: number;
    y: number;
    r: number;
    maxr: number;
    speed: number;
  }[] = [];

  return () => {
    ctx.fillStyle = primaryColor;

    if (particles.length < 30 && Math.random() < 0.05) {
      // Math.random all the things.
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 10 + Math.random() * 40,
        maxr: 50 + Math.random() * 200,
        speed: 0.2 + Math.random(),
      });
    }

    for (const particle of particles) {
      particle.r += particle.speed;

      if (particle.r > particle.maxr) {
        particles = particles.filter(p => p !== particle);
        continue;
      }

      ctx.globalAlpha = 1 - particle.r / particle.maxr;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };
};
