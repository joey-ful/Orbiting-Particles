import BrushStroke from './brushStroke.js';

export default class Brush {
  constructor(n, minWidth, maxWidth, minDistance, maxDistance) {
    this.brush = [];
    this.colors = ['#3bc9db', '#4dabf7', '#748ffc', '#9775fa'];
    this.createBrushStrokes(n, minWidth, maxWidth, minDistance, maxDistance);
  }

  createBrushStrokes(n, minWidth, maxWidth, minDistance, maxDistance) {
    this.maxDistance = 0;

    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * 4);
      let width = Math.random() * (maxWidth - minWidth) + minWidth;
      let distanceFromCenter = Math.ceil(
        Math.random() * (maxDistance - minDistance) + minDistance
      );

      this.brush.push(
        new BrushStroke(
          width,
          this.colors[index],
          distanceFromCenter
        )
      );

      this.maxDistance = Math.max(this.maxDistance, distanceFromCenter);
    }
  }

  draw(ctx) {
    this.brush.forEach((stroke) => {
      stroke.update(ctx, this.maxDistance);
    });
  }
}
