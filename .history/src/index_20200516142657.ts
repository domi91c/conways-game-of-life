class App {
  c: CanvasRenderingContext2D

  constructor() {
    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.style.border = '1px solid black'
    canvas.width = 700;
    canvas.height = 700;
    this.c = canvas.getContext('2d')
    this.c.fill();
  }
}

class Grid {
  constructor(context: CanvasRenderingContext2D) {

  }
}

new App()
