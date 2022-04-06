export class DrawingArea {
  #canvas = null;
  context = null;

  constructor(canvas) {
    if (!canvas) {
      throw new Error('canvas should be defined');
    }

    this.#canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  addWidget(widget) {
    widget.draw();
  }

  addWidgetEmpty(widget) {
    widget.drawEmpty();
  }

  clear() {
    this.context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }
}
