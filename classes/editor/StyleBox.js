export class StyleBox {
  constructor ({
    radius = 8,
    padding = 8,
    fill = '#FFFFFF',
    stroke = '',
    selectedStroke = '#2196F3',
    shadow = 4
  }) {
    this.radius = radius
    this.padding = padding
    this.fill = fill
    this.stroke = stroke
    this.selectedStroke = selectedStroke
    this.shadow = shadow
  }
}
