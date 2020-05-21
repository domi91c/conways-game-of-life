import Grid from './Grid';
import Box from './Box';

export default class App {
  canvas: HTMLCanvasElement
  diagnostics: HTMLElement
  startButton: HTMLElement
  pauseButton: HTMLElement
  resetButton: HTMLElement
  ctx: CanvasRenderingContext2D
  grid: Grid
  static isPaused: boolean

  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.diagnostics = document.getElementById('diagnostics')
    this.startButton = document.getElementById('start-button')
    this.pauseButton = document.getElementById('pause-button')
    this.resetButton = document.getElementById('reset-button')
    this.canvas.style.border = '1px solid #ccc'
    this.canvas.width = 700
    this.canvas.height = 700
    this.ctx = this.canvas.getContext('2d')
    this.grid = new Grid(this.ctx)
    this.addEventListeners()
  }

  start() {
    App.isPaused = false
    setInterval(() => this.render(), 100)
    // window.requestAnimationFrame(() => this.render());
  }

  pause() {
    App.isPaused = true
    // window.requestAnimationFrame(() => this.render());
  }

  reset() {
    this.grid.boxes.forEach((row: Array<Box>) => {
      row.forEach((box: Box) => {
        box.state = Math.random() >= 0.5
      })
    })
  }


  render() {
    if (!App.isPaused) this.grid.start()
    // window.requestAnimationFrame(() => this.render());
  }

  addEventListeners() {
    this.startButton.addEventListener('click', () => {
      this.start()
    })

    this.pauseButton.addEventListener('click', () => {
      this.pause()
    })

    this.resetButton.addEventListener('click', () => {
      this.reset()
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.collisionDetector(event, (box: Box) => {
        this.diagnostics.innerHTML = `Row: ${box.row}, Col: ${box.col} | Neighbours: ${box.neighbours.length}`
        box.neighbours.forEach((b: Box) => {
          b.highlight()
        })
      })
    })
    this.canvas.addEventListener('click', (event) => {
      this.collisionDetector(event, (box: Box) => box.toggleState())
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
