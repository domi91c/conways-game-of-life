import Box from './Box';
import App from './index';

export default class Grid {
  ctx: CanvasRenderingContext2D
  boxes: Array<Array<Box>> = [[]]
  boxSize: number
  rowSize: number
  diagnostics: HTMLElement;

  constructor(app: App) {
    Box.grid = this
    this.ctx = app.ctx;
    this.diagnostics = app.diagnostics;
    this.boxSize = 20;
    this.rowSize = 35;
    this.draw();
  }

  private draw() {
    for (let xI = 0; xI < this.rowSize; xI++) {
      this.boxes.push([])
      for (let yI = 0; yI < this.rowSize; yI++) {
        this.boxes[xI].push(
          new Box(
            yI,
            xI,
            this.boxSize,
            (Math.floor(Math.random() * Math.floor(2)) > 2),
          )
        );
      }
    }
  }
}
