import { Base } from './base'

export class Permission extends Base {
  static entity = 'permissions'

  static fields () {
    return {
      id: this.attr(null),
      createdAt: this.attr(0),
      level: this.number(0),
      revoked: this.boolean(false),
      accepted: this.boolean(false),
      revokedAt: this.attr(null).nullable(),
      userId: this.string(''),
      projectId: this.attr(null)
    }
  }
}
