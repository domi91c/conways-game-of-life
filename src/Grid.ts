import Box from './Box';

export default class Grid {
  ctx: CanvasRenderingContext2D
  boxes: Array<Array<Box>> = [[]]
  boxSize: number
  rowSize: number

  constructor(ctx: CanvasRenderingContext2D) {
    Box.grid = this
    this.ctx = ctx;
    this.boxSize = 10;
    this.rowSize = 70;
    this.draw();
  }

  private draw() {
    for (let yI = 0; yI < this.rowSize; yI++) {
      this.boxes.push([])
      for (let xI = 0; xI < this.rowSize; xI++) {
        this.boxes[yI].push(
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

  start(): any {
    this.boxes.forEach((row: Array<Box>) => {
      row.forEach((box: Box) => {
        box.generation()
      })
    });
    this.boxes.forEach((row: Array<Box>) => {
      row.forEach((box: Box) => {
        box.transferState()
        box.render()
      })
    });
  }
}
