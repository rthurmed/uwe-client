import { SuplementaryInfo } from '~/classes/SuplementaryInfo'
import { UCEntities } from '~/classes/entity/helpers'

export class DiagramTypeExtendedInfo extends SuplementaryInfo {
  constructor ({
    label,
    icon,
    entityTypes = UCEntities
  }) {
    super({ label, icon })
    this.entityTypes = entityTypes
  }
}
