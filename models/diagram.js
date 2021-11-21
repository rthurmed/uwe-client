import { Base } from './base'
import { Entity } from './entity'

export class Diagram extends Base {
  static entity = 'diagrams'

  static fields () {
    return {
      id: this.attr(null),
      createdAt: this.attr(0),
      name: this.string(''),
      type: this.number(0),
      projectId: this.attr(null),
      entities: this.hasMany(Entity, 'diagramId')
    }
  }
}
