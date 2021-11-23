import { Base } from './base'

export class Participant extends Base {
  static entity = 'participants'

  static fields () {
    return {
      id: this.attr(null),
      createdAt: this.attr(0),
      userId: this.string(''),
      x: this.number(0),
      y: this.number(0),
      diagramId: this.attr(null),
      grabbedId: this.attr(null)
    }
  }
}
