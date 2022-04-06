import { DrawingArea } from './DrawingArea.js';
import * as shapes from './shapes/index.js';

export class DrawingApp {
  #id = null;
  #canvas = null;
  #drawingArea = null;
  #drawInput = null;
  #backgroundInput = null;

  #Shape = shapes.Circle;

  #backgroundColor = '';
  #drawColor = '';
  #drawFill = false;
  #drawMode = false;
  #drawRadius = 15;

  constructor(id) {
    if (!id) {
      throw new Error('id should be defined');
    }

    this.#id = id;

    this.#queryElements();
    this.#setEventListeners();
    this.#setInitials();
  }

  #draw(e) {
    const shape = new this.#Shape({
      centerX: e.offsetX,
      centerY: e.offsetY,
      color: this.#drawColor,
      context: this.#drawingArea.context,
      radius: this.#drawRadius
    });

    if (this.#drawMode && this.#drawFill) {
      this.#drawingArea.addWidget(shape);
    } else {
      this.#drawingArea.addWidgetEmpty(shape);
    }
  }

  #onBackgroundColorChange = (e) => {
    this.#backgroundColor = e.target.value;
    this.#canvas.style.backgroundColor = this.#backgroundColor;
  };

  #onClear = () => this.#drawingArea.clear();

  #onDraw = () => {
    this.#drawMode = true;
    this.#drawColor = this.#drawInput.value;
    this.#setCursor('paint-brush');
  };

  #onDrawColorChange = (e) => {
    this.#drawColor = e.target.value;
  };

  #onShapeSelect = (button) => {
    this.#drawMode = false;
    this.#drawFill = false;
    this.#drawColor = this.#drawInput.value;
    this.#Shape = shapes[button.id];
    this.#setCursor('pencil');
  };

  #onErase = () => {
    this.#drawMode = true;
    this.#drawColor = this.#backgroundColor;
    this.#setCursor('eraser');
  };

  #onMouseDown = (e) => {
    this.#drawFill = true;
    this.#draw(e);
  };

  #onMouseMove = (e) => {
    // this.#drawFill &&
    this.#drawMode && this.#drawFill && this.#draw(e);
  };

  #onMouseUp = () => {
    this.#drawFill = false;
  };

  #setCursor(type) {
    switch (type) {
      case 'pencil':
        $(this.#canvas).awesomeCursor('pencil', {
          color: 'limegreen',
          size: 24,
          hotspot: 'bottom left',
          outline: 'brown'
        });
        break;

      case 'paint-brush':
        $(this.#canvas).awesomeCursor('paint-brush', {
          color: 'grey',
          size: 30,
          hotspot: 'bottom left',
          outline: 'black'
        });
        break;

      case 'eraser':
        $(this.#canvas).awesomeCursor('eraser', {
          color: 'skyblue',
          size: 32,
          hotspot: 'bottom left',
          outline: 'black'
        });
        break;
    }
  }

  #setDimensions() {
    // Set canvas width based on parent's one
    this.#canvas.width = document.querySelector('#canvasContainer').offsetWidth;

    // Set canvas height based on parent's one
    this.#canvas.height =
      document.querySelector('#canvasContainer').offsetHeight;
  }

  #setEventListeners() {
    // Add `mousedown` event listener
    this.#canvas.addEventListener('mousedown', this.#onMouseDown);

    // Add `mouseup` event
    this.#canvas.addEventListener('mouseup', this.#onMouseUp);

    // Add `mousemove` event
    this.#canvas.addEventListener('mousemove', this.#onMouseMove);

    // Add background input `change` event listener
    this.#backgroundInput.addEventListener(
      'change',
      this.#onBackgroundColorChange
    );

    // Add draw input `change` event listener
    this.#drawInput.addEventListener('change', this.#onDrawColorChange);

    // Add draw button `click` event listener
    document.querySelector('#draw').addEventListener('click', this.#onDraw);

    // Add shape buttons `click` event listeners
    document
      .querySelectorAll('.btn-shape')
      .forEach((button) =>
        button.addEventListener('click', this.#onShapeSelect.bind(this, button))
      );

    // Add erase button `click` event listener
    document.querySelector('#erase').addEventListener('click', this.#onErase);

    // Add clear button `click` event listener
    document.querySelector('#clear').addEventListener('click', this.#onClear);

    // Add window `resize` event listener
    window.addEventListener('resize', this.#setDimensions.bind(this));
  }

  #setInitials() {
    // canvas dimensions
    this.#setDimensions();

    // Initialize drawingArea with the canvas
    this.#drawingArea = new DrawingArea(this.#canvas);

    // drawColor
    this.#drawColor = this.#drawInput.value;

    // backgroundColor
    this.#backgroundColor = this.#backgroundInput.value;
    this.#canvas.style.backgroundColor = this.#backgroundColor;

    // cursor type
    this.#setCursor('pencil');
  }

  #queryElements() {
    // Get canvas DOM element
    this.#canvas = document.querySelector(`#${this.#id}`);

    this.#backgroundInput = document.querySelector('#background input');

    this.#drawInput = document.querySelector('#draw input');
  }
}
