import Grid from './Grid';

export default class Box {
  static grid: Grid
  ctx: CanvasRenderingContext2D;
  row: number
  col: number
  x: number;
  y: number;
  size: number;
  state: boolean;
  nextState: boolean;
  numberOfNeighbours: any;

  constructor(row: number, col: number, size: number, state: boolean) {
    this.ctx = Box.grid.ctx
    this.row = row
    this.col = col
    this.x = col * size;
    this.y = row * size;
    this.size = size;
    this.state = state
    this.nextState = false
    this.render()
  }

  /**
   * Renders the box
   */
  render() {
    this.ctx.strokeStyle = '#cccccc';
    this.ctx.strokeRect(this.x, this.y, this.size, this.size);
    if (this.state) {
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    } else {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  generation() {
    if (this.state) {
      if (this.neighbours.length < 2 || this.neighbours.length > 3) {
        this.turnOff()
      } else {
        this.turnOn()
      }
    } else {
      if (this.neighbours.length === 3) {
        this.turnOn()
      }
    }
  }

  transferState() {
    this.state = this.nextState
  }

  /**
   * Toggles box state
   */
  toggleState() {
    console.log(this);
    this.state = !this.state
    this.render()
  }

  /**
   * Turns box state on
   */
  private turnOn() {
    this.nextState = true
  }

  /**
   * Turns box state off
   */
  private turnOff() {
    this.nextState = false
  }

  /**
   * @returns Count of active neighbours
   */
  get neighbours(): Array<Box> {
    let boxes = Box.grid.boxes

    // left side
    let topL: Box | undefined = boxes[this.row - 1] ? boxes[this.row - 1][this.col - 1] : undefined
    let midL: Box | undefined = boxes[this.row - 1] ? boxes[this.row - 1][this.col] : undefined
    let botL: Box | undefined = boxes[this.row - 1] ? boxes[this.row - 1][this.col + 1] : undefined

    // right side
    let topR: Box | undefined = boxes[this.row + 1] ? boxes[this.row + 1][this.col - 1] : undefined
    let midR: Box | undefined = boxes[this.row + 1] ? boxes[this.row + 1][this.col] : undefined
    let botR: Box | undefined = boxes[this.row + 1] ? boxes[this.row + 1][this.col + 1] : undefined

    // top and bottom
    let topC: Box | undefined = boxes[this.row] ? boxes[this.row][this.col - 1] : undefined
    let botC: Box | undefined = boxes[this.row] ? boxes[this.row][this.col + 1] : undefined

    let filteredBoxes = [topL, topC, topR, midR, botR, botC, botL, midL]
      .filter((box: Box | undefined) => {
        return box !== undefined && box.state
      })

    return filteredBoxes
  }

  highlight() {
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  get neighboursInfo(): String {
    return this.neighbours.map(b => `R:${b.row}, C:${b.col}, O:${b.state}|`).join(' ')
  }

}
