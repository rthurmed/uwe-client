import { EntityType } from '~/models/enum/entity-type'
import { EntityTypeExtendedInfo } from '~/classes/entity/EntityTypeExtendedInfo'
import { EntityProp } from '~/classes/entity/EntityProp'
import { UCNodeEntities } from '~/classes/entity/helpers'

export const EntityTypeInfo = {
  [EntityType.NOTE]: new EntityTypeExtendedInfo({
    label: 'Nota',
    height: 200,
    width: 200,
    props: [EntityProp.TITLE]
  }),
  [EntityType.ACTOR]: new EntityTypeExtendedInfo({
    label: 'Ator',
    props: [EntityProp.TITLE, EntityProp.ABSTRACT]
  }),
  [EntityType.USECASE]: new EntityTypeExtendedInfo({
    label: 'Caso de Uso',
    height: 100,
    width: 200,
    props: [EntityProp.TITLE, EntityProp.ABSTRACT]
  }),
  [EntityType.ASSOCIATION]: new EntityTypeExtendedInfo({
    label: 'Associação',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  [EntityType.GENERALIZATION]: new EntityTypeExtendedInfo({
    label: 'Generalização',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  [EntityType.EXTEND]: new EntityTypeExtendedInfo({
    label: 'Extend',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  [EntityType.INCLUDE]: new EntityTypeExtendedInfo({
    label: 'Include',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  })
}
