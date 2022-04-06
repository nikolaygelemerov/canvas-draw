import { Shape } from './Shape.js';

export class Square extends Shape {
  constructor(props) {
    super(props);
  }

  draw() {
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(this.centerX + this.radius * 2, this.centerY);
    this.context.lineTo(
      this.centerX + this.radius * 2,
      this.centerY - this.radius * 2
    );
    this.context.lineTo(this.centerX, this.centerY - this.radius * 2);
    this.context.lineTo(this.centerX, this.centerY);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }

  drawEmpty() {
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(this.centerX + this.radius * 2, this.centerY);
    this.context.lineTo(
      this.centerX + this.radius * 2,
      this.centerY - this.radius * 2
    );
    this.context.lineTo(this.centerX, this.centerY - this.radius * 2);
    this.context.lineTo(this.centerX, this.centerY);
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }
}
