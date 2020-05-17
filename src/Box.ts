import Grid from './Grid';

export default class Box {
  static grid: Grid
  ctx: CanvasRenderingContext2D;
  row: number
  col: number
  x: number;
  y: number;
  size: number;
  on: boolean;
  numberOfNeighbours: any;

  constructor(
    row: number,
    col: number,
    size: number,
    on: boolean,
  ) {
    this.ctx = Box.grid.ctx
    this.row = row
    this.col = col
    this.x = row * size;
    this.y = col * size;
    this.size = size;
    this.on = on
    this.render()
  }

  /**
   * Renders the box
   */
  render() {
    this.ctx.strokeStyle = '#cccccc';
    this.ctx.strokeRect(this.x, this.y, this.size, this.size);
    if (this.on) {
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    } else {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  /**
   * Toggles box state
   */
  toggleOn() {
    console.log("Grid:");
    console.log(Box.grid);
    this.on = !this.on
    this.render()
  }

  turnOff() {
    this.on = false
    this.render()
  }

  /**
   * @returns Count of active neighbours
   */
  get neighbours(): Array<Box> {
    let boxes = Box.grid.boxes

    debugger;
    // left side
    let topL: Box | undefined = boxes[this.row - 1] ? boxes[this.row - 1][this.col + 1] : undefined
    let midL: Box | undefined = boxes[this.row - 1] ? boxes[this.row - 1][this.col] : undefined
    let botL: Box | undefined = boxes[this.row - 1] ? boxes[this.row - 1][this.col - 1] : undefined

    // right side
    let topR: Box | undefined = boxes[this.row + 1] ? boxes[this.row + 1][this.col + 1] : undefined
    let midR: Box | undefined = boxes[this.row + 1] ? boxes[this.row + 1][this.col] : undefined
    let botR: Box | undefined = boxes[this.row + 1] ? boxes[this.row + 1][this.col - 1] : undefined

    // top and bottom
    let topC: Box | undefined = boxes[this.row] ? boxes[this.row][this.col + 1] : undefined
    let botC: Box | undefined = boxes[this.row] ? boxes[this.row][this.col - 1] : undefined

    let filteredBoxes = [topL, topC, topR, midR, botR, botC, botL, midL]
      .filter((box: Box | undefined) => {
        box !== undefined
      })

    return filteredBoxes
  }

  highlight() {
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
