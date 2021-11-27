import { StyleBox } from './StyleBox'
import { StyleLine } from './StyleLine'
import { StyleText } from './StyleText'

export class Style {
  constructor ({
    box = new StyleBox({}),
    text = new StyleText({}),
    line = new StyleLine({}),
    background = '#FFFFFF'
  }) {
    this.box = box
    this.text = text
    this.line = line
    this.background = background
  }
}
