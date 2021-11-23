import { Base } from './base'
import { Entity } from './entity'
import { Participant } from './participant'

export class Diagram extends Base {
  static entity = 'diagrams'

  static fields () {
    return {
      id: this.attr(null),
      createdAt: this.attr(0),
      name: this.string(''),
      type: this.number(0),
      projectId: this.attr(null),
      entities: this.hasMany(Entity, 'diagramId'),
      participants: this.hasMany(Participant, 'diagramId')
    }
  }
}
