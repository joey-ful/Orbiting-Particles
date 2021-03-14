export default class BrushStroke {
  constructor(width, color, distanceFromCenter) {
    this.theta = Math.random() * Math.PI * 2;
    this.width = width;
    this.color = color;
    this.velocity = 0.05;
    this.distanceFromCenter = distanceFromCenter;
    this.canvas = document.getElementById('drawpad');
    this.mousedown = false;

    this.mouse = {
      x: 0,
      y: 0,
    };

    //e.clientX, Y
    this.canvas.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    })
    
    //for smooth dragging effect
    this.lastMouse = {
      x: this.mouse.x,
      y: this.mouse.y,
    };

    this.x = this.lastMouse.x + this.distanceFromCenter * Math.cos(this.theta);
    this.y = this.lastMouse.y + this.distanceFromCenter * Math.sin(this.theta);
  }

  update(ctx, maxDistance) {
    //to remember the last location
    const lastPoint = {
      x: this.x,
      y: this.y,
    };

    this.maxDistance = maxDistance;
    this.theta += this.velocity;

    this.interaction();

    //smooth drag => only follows by 5% of the mouse movement
    this.lastMouse.x += (this.mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (this.mouse.y - this.lastMouse.y) * 0.05;

    this.x = this.lastMouse.x + this.distanceFromCenter * Math.cos(this.theta);
    this.y = this.lastMouse.y + this.distanceFromCenter * Math.sin(this.theta);

    this.draw(ctx, lastPoint);
  }

  draw(ctx, lastPoint) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  }

  interaction = () => {
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);
  };

  onMouseDown = (e) => {
    this.offsetX = e.clientX - this.lastMouse.x;
    this.offsetY = e.clientY - this.lastMouse.y;

    this.canvas.addEventListener('mousemove', this.onMouseMove);
  };

  onMouseMove = (e) => {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  };

  onMouseUp = (e) => {
    this.lastMouse.x += (this.mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (this.mouse.y - this.lastMouse.y) * 0.05;

    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseOut = (e) => {
    this.clicked = false;

    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  };
}
