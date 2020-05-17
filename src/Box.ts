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


  /**
   * @returns Count of activated neighbours
   */
  get neighbours() {
    debugger;

    return count
  }
}
