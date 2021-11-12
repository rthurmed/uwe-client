import { Base } from './base'

export class User extends Base {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      createdTimestamp: this.number(0),
      username: this.string(''),
      enabled: this.boolean(false),
      emailVerified: this.boolean(false),
      firstName: this.string(''),
      lastName: this.string(''),
      email: this.string('')
    }
  }
}
