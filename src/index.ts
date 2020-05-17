import Grid from './Grid';
import Box from './Box';

export default class App {
  canvas: HTMLCanvasElement
  diagnostics: HTMLElement
  startButton: HTMLElement
  resetButton: HTMLElement
  ctx: CanvasRenderingContext2D
  grid: Grid

  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.diagnostics = document.getElementById("diagnostics")
    this.startButton = document.getElementById("start-button")
    this.resetButton = document.getElementById("reset-button")
    this.canvas.style.border = '1px solid black'
    this.canvas.width = 700
    this.canvas.height = 700
    this.ctx = this.canvas.getContext('2d')
    this.grid = new Grid(this.ctx)
    this.addEventListeners()
  }

  addEventListeners() {
    this.resetButton.addEventListener('click', () => {
      this.grid.boxes.forEach((row: Array<Box>) => {
        row.forEach((box: Box) => {
          box.turnOff()
        })
      });
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.collisionDetector(event, (box: Box) => {
        this.diagnostics.innerHTML = `Row: ${box.row}, Col: ${box.col} | ${box.neighbours.length}`
        debugger;
        box.neighbours.forEach((box: Box) => {
          box.highlight()
        })
      })
    })
    this.canvas.addEventListener('click', (event) => {
      this.collisionDetector(event, (box: Box) => box.toggleOn())
    })
  }

  private collisionDetector(event: any, cb: Function) {
    let elemLeft = this.canvas.offsetLeft + this.canvas.clientLeft
    let elemTop = this.canvas.offsetTop + this.canvas.clientTop
    let x = event.pageX - elemLeft,
      y = event.pageY - elemTop;

    this.grid.boxes.forEach((row: Array<Box>) => {
      row.forEach((box: Box) => {
        if (y > box.y && y < box.y + box.size &&
          x > box.x && x < box.x + box.size) {
          cb(box)
        }
      })
    });
  }
}

new App()
