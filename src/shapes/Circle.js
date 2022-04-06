import { Shape } from './Shape.js';

export class Circle extends Shape {
  constructor(props) {
    super(props);
  }

  draw() {
    // method of the Canvas 2D API starts a new path
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }

  drawEmpty() {
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.context.strokeStyle = this.color;
    this.context.strokeWidth = this.lineWidth;
    this.context.stroke();
  }
}
