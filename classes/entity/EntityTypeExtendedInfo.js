import { SuplementaryInfo } from '~/classes/SuplementaryInfo'
import { EntityProp } from '~/classes/entity/EntityProp'

export class EntityTypeExtendedInfo extends SuplementaryInfo {
  constructor ({
    label,
    icon,
    height = 100,
    width = 100,
    props = [EntityProp.TITLE],
    linkableTypes = [],
    selfLinkAsTarget = false,
    selfLinkAsOrigin = false,
    background = false,
    quickCreates = {}
  }) {
    super({ label, icon })
    this.height = height
    this.width = width
    this.props = props
    this.linkableTypes = linkableTypes
    this.selfLinkAsTarget = selfLinkAsTarget
    this.selfLinkAsOrigin = selfLinkAsOrigin
    this.background = background
    this.quickCreates = quickCreates
  }
}
