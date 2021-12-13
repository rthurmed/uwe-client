import { EntityType } from '~/models/enum/entity-type'
import { EntityTypeExtendedInfo } from '~/classes/entity/EntityTypeExtendedInfo'
import { EntityProp } from '~/classes/entity/EntityProp'
import { ANodeEntities, UCNodeEntities } from '~/classes/entity/helpers'

export const EntityTypeInfo = {
  // USE CASE
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
  }),
  // ACTIVITIES
  [EntityType.A_ACTION]: new EntityTypeExtendedInfo({
    label: 'Ação',
    props: [EntityProp.TITLE],
    height: 100,
    width: 200
  }),
  [EntityType.A_START]: new EntityTypeExtendedInfo({
    label: 'Início',
    props: [],
    height: 50,
    width: 50
  }),
  [EntityType.A_END]: new EntityTypeExtendedInfo({
    label: 'Final',
    props: [],
    height: 50,
    width: 50
  }),
  [EntityType.A_END_FLOW]: new EntityTypeExtendedInfo({
    label: 'Final de fluxo',
    props: [],
    height: 50,
    width: 50
  }),
  [EntityType.A_BRANCH]: new EntityTypeExtendedInfo({
    label: 'Decisão',
    props: [],
    height: 60,
    width: 60
  }),
  [EntityType.A_MERGE]: new EntityTypeExtendedInfo({
    label: 'União',
    props: [],
    height: 60,
    width: 60
  }),
  [EntityType.A_FORK]: new EntityTypeExtendedInfo({
    label: 'Fork',
    props: [],
    height: 200,
    width: 20
  }),
  [EntityType.A_JOIN]: new EntityTypeExtendedInfo({
    label: 'Join',
    props: [],
    height: 200,
    width: 20
  }),
  [EntityType.A_OBJ]: new EntityTypeExtendedInfo({
    label: 'Objeto',
    props: [EntityProp.TITLE]
  }),
  [EntityType.A_ASSOCIATION]: new EntityTypeExtendedInfo({
    label: 'Associação',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: ANodeEntities
  }),
  [EntityType.A_EXCEPTION]: new EntityTypeExtendedInfo({
    label: 'Exceção',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: ANodeEntities
  })
}
