import { Base } from './base'

export class Entity extends Base {
  static entity = 'entities'

  static fields () {
    return {
      id: this.attr(null),
      createdAt: this.attr(0),
      type: this.number(0),
      title: this.string(''),
      x: this.number(0),
      y: this.number(0),
      width: this.number(0),
      height: this.number(0),
      abstract: this.boolean(false),
      diagramId: this.attr(null),
      originId: this.attr(null),
      targetId: this.attr(null)
    }
  }
}
