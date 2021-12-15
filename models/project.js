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

  /**
   * Verify if the user has a permission
   *
   * @param {string} userId
   * @param {Array} level
   */
  isAllowed (userId, levels = []) {
    return Permission
      .query()
      .where('projectId', this.id)
      .where('userId', userId)
      .where('accepted', true)
      .where('level', a => levels.includes(a))
      .count()
  }
}
