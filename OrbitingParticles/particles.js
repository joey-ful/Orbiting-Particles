import Particle from './particle.js';

export default class Particles {
  constructor(x, y, n, minWidth, maxWidth, minDistance, maxDistance) {
    this.particles = [];
    this.colors = ['#3bc9db', '#4dabf7', '#748ffc', '#9775fa'];
    this.x = x;
    this.y = y;
    this.createParticles(n, minWidth, maxWidth, minDistance, maxDistance);
  }

  createParticles(n, minWidth, maxWidth, minDistance, maxDistance) {
    this.maxDistance = 0;

    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * 4);
      let width = Math.random() * (maxWidth - minWidth) + minWidth;
      let distanceFromCenter = Math.ceil(
        Math.random() * (maxDistance - minDistance) + minDistance
      );

      this.particles.push(
        new Particle(
          this.x,
          this.y,
          width,
          this.colors[index],
          distanceFromCenter
        )
      );

      this.maxDistance = Math.max(this.maxDistance, distanceFromCenter);
    }
  }

  draw(ctx) {
    this.particles.forEach((particle) => {
      particle.update(ctx, this.maxDistance);
    });
  }
}
