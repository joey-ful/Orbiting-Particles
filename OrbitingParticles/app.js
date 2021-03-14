import Particles from './particles.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.particles = new Particles(
      this.stageWidth / 5,
      this.stageHeight / 4,
      50,
      2,
      4,
      50,
      120,
    );

    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.fillStyle = 'rgba(77, 87, 98, 0.05)';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.particles.draw(this.ctx);
  }
}

new App();
