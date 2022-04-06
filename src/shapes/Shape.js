export class Shape {
  constructor({ centerX, centerY, color, context, lineWidth, radius }) {
    if (this.constructor === Shape) {
      throw new Error('This class is abstract');
    }

    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
    this.context = context;
    this.lineWidth = lineWidth;
    this.radius = radius;
  }

  draw() {
    throw new Error('This method is abstract');
  }

  drawEmpty() {
    throw new Error('This method is abstract');
  }
}
