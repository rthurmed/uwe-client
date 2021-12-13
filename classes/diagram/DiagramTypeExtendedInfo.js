import { SuplementaryInfo } from '~/classes/SuplementaryInfo'
import { UCEntities } from '~/classes/entity/helpers'

export class DiagramTypeExtendedInfo extends SuplementaryInfo {
  constructor ({
    label,
    icon,
    entities = UCEntities
  }) {
    super({ label, icon })
    this.entities = entities
  }
}
