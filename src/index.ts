import Grid from './Grid';
import Box from './Box';

export default class App {
  canvas: HTMLCanvasElement
  diagnostics: HTMLElement
  ctx: CanvasRenderingContext2D
  grid: Grid

  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.diagnostics = document.getElementById("diagnostics")
    this.canvas.style.border = '1px solid black'
    this.canvas.width = 700
    this.canvas.height = 700
    this.ctx = this.canvas.getContext('2d')
    this.grid = new Grid(this)
    this.addEventListeners()
  }

  addEventListeners() {
    let elemLeft = this.canvas.offsetLeft + this.canvas.clientLeft
    let elemTop = this.canvas.offsetTop + this.canvas.clientTop
    this.canvas.addEventListener('click', (event) => {
      let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

      this.grid.boxes.forEach((row: Array<Box>) => {
        row.forEach((box: Box) => {
          if (y > box.y && y < box.y + box.size
            && x > box.x && x < box.x + box.size) {
            box.toggleOn()
          }
        })
      });
    })
  }
}

new App()
