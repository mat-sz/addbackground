export interface BackgroundOptions {
  canvas: HTMLCanvasElement;
  type: 'bubbles';
}

export function addBackground({ canvas, type }: BackgroundOptions): void {
  if (type !== 'bubbles') {
    throw new Error('Unsupported background type.');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to create Context2D.');
  }

  const particlesMax = 150;
  const particlesChance = 0.1;
  let mouseX = 0;
  let mouseY = 0;
  let particles: { x: number; y: number; r: number; speed: number }[] = [];
  let t = 0;

  canvas.addEventListener('mousemove', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  });

  const renderFunction = () => {
    t++;
    if (t > 360) t = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particles.length < particlesMax && Math.random() < particlesChance) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        r: 10 + Math.random() * 40,
        speed: Math.random(),
      });
    }

    for (const particle of particles) {
      particle.y -= particle.speed + Math.sin((t * Math.PI) / 180);

      // Detect if the pointer is nearby and react to it.
      const distance = Math.sqrt(
        Math.pow(mouseX - particle.x, 2) + Math.pow(mouseY - particle.y, 2)
      );
      if (distance < 50 + particle.r) {
        const factor = 1 - distance / (50 + particle.r);
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

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    requestAnimationFrame(renderFunction);
  };

  requestAnimationFrame(renderFunction);
}
