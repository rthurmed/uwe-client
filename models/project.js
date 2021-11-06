import { Base } from './base'
import { Diagram } from './diagram'
import { Permission } from './permission'

export class Project extends Base {
  static entity = 'projects'

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      createdAt: this.attr(0),
      permissions: this.hasMany(Permission, 'projectId'),
      diagrams: this.hasMany(Diagram, 'projectId')
    }
  }
}
