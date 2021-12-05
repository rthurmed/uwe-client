import { SuplementaryInfo } from '~/classes/SuplementaryInfo'

export class ExtendedInfo extends SuplementaryInfo {
  constructor ({
    label,
    icon,
    immutable = false,
    type = 'string'
  }) {
    super({ label, icon })
    this.immutable = immutable
    this.type = type
  }
}
