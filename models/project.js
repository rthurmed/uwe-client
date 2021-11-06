import { Model } from '@vuex-orm/core'

export class Project extends Model {
  static entity = 'projects'

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      createdAt: this.attr()
      // TODO: permissions
      // TODO: diagrams
    }
  }
}