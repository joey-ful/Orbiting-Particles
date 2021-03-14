import Brush from './brush.js';

class App {
  constructor() {
    this.stage = document.createElement('div');
    this.stage.setAttribute('id', 'stage');
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');
    this.drawpad = document.createElement('canvas');
    this.drawpad.setAttribute('id', 'drawpad');
    this.drawctx = this.drawpad.getContext('2d');

    document.body.appendChild(this.stage);
    this.stage.appendChild(this.drawpad);
    this.stage.appendChild(this.canvas);

    this.canvas.style.zIndex = '1';
    this.drawpad.style.zIndex = '2';

    this.mousedown = false;

    window.addEventListener('mousedown', (e) => {
      this.mousedown = true;
    });

    window.addEventListener('mouseup', (e) => {
      this.mousedown = false;
    });

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.brush = new Brush(20, 2, 3, 0, 20);

    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.drawpad.width = this.stageWidth * 2;
    this.drawpad.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
    this.drawctx.scale(2, 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    if (!this.mousedown) {
      this.ctx.fillStyle = 'rgba(77, 87, 98, 0.05)';
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
      this.brush.draw(this.ctx);
    } else {
      this.brush.draw(this.drawctx);
    }
  }
}

new App();
