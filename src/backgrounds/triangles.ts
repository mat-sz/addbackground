import { RenderFunctionFactory, RenderOptions } from '.';

export const triangles: RenderFunctionFactory = ({
  canvas,
  ctx,
  primaryColor,
}: RenderOptions) => {
  const particlesMax = 150;
  const particlesChance = 0.1;
  const particleRadius = 2;
  const connectionDistance = 100;
  let mouseX = 0;
  let mouseY = 0;
  let particles: { x: number; y: number; speed: number }[] = [];
  let t = 0;

  canvas.addEventListener('mousemove', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  });

  for (let i = 0; i < particlesMax; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random(),
    });
  }

  return () => {
    t++;
    if (t > 360) t = 0;

    ctx.strokeStyle = primaryColor;
    ctx.fillStyle = primaryColor;

    if (particles.length < particlesMax && Math.random() < particlesChance) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        speed: Math.random(),
      });
    }

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const furtherParticles = particles.slice(i + 1);

      particle.y -= particle.speed;

      // Detect if the pointer is nearby and react to it.
      const distance = Math.sqrt(
        Math.pow(mouseX - particle.x, 2) + Math.pow(mouseY - particle.y, 2)
      );
      if (distance < connectionDistance + particleRadius) {
        const factor = 1 - distance / (connectionDistance + particleRadius);
        if (particle.x > mouseX) particle.x += factor;
        else particle.x -= factor;

        if (particle.y > mouseY) particle.y += factor;
        else particle.y -= factor;
      }

      // Remove "dead" particles.
      if (particle.y < -60) {
        particles = particles.filter(p => p !== particle);
        continue;
      }

      // Connect to other particles.
      for (const p of furtherParticles) {
        const distance = Math.sqrt(
          Math.pow(p.x - particle.x, 2) + Math.pow(p.y - particle.y, 2)
        );

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particleRadius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  };
};
