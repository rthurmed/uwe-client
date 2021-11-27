export class StyleLine {
  constructor ({
    stroke = '#FFFFFF',
    strokeWidth = 4,
    lineCap = 'round',
    lineJoin = 'round'
  }) {
    this.stroke = stroke
    this.strokeWidth = strokeWidth
    this.lineCap = lineCap
    this.lineJoin = lineJoin
  }
}
