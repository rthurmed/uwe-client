import { EntityType } from '~/models/enum/entity-type'
import { EntityTypeExtendedInfo } from '~/classes/entity/EntityTypeExtendedInfo'
import { EntityProp } from '~/classes/entity/EntityProp'
import { ANodeEntities, UCNodeEntities } from '~/classes/entity/helpers'
import { createAsTarget, createAsOrigin, createEmpty } from '~/classes/entity/quickCreates'

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
    width: 200,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsOrigin,
      [EntityType.A_EXCEPTION]: createAsOrigin
    }
  }),
  [EntityType.A_START]: new EntityTypeExtendedInfo({
    label: 'Início',
    props: [],
    height: 50,
    width: 50,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsOrigin,
      [EntityType.A_EXCEPTION]: createAsOrigin,
      [EntityType.A_ACTION]: createEmpty
    }
  }),
  [EntityType.A_END]: new EntityTypeExtendedInfo({
    label: 'Final',
    props: [],
    height: 50,
    width: 50,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsTarget,
      [EntityType.A_EXCEPTION]: createAsTarget
    }
  }),
  [EntityType.A_END_FLOW]: new EntityTypeExtendedInfo({
    label: 'Final de fluxo',
    props: [],
    height: 50,
    width: 50,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsTarget,
      [EntityType.A_EXCEPTION]: createAsTarget
    }
  }),
  [EntityType.A_BRANCH]: new EntityTypeExtendedInfo({
    label: 'Decisão (Branch)',
    props: [EntityProp.TITLE, EntityProp.ORIGINID],
    height: 130,
    width: 200,
    linkableTypes: ANodeEntities,
    selfLinkAsTarget: true,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsOrigin
    }
  }),
  [EntityType.A_MERGE]: new EntityTypeExtendedInfo({
    label: 'União (Merge)',
    props: [EntityProp.TARGETID],
    height: 130,
    width: 200,
    linkableTypes: ANodeEntities,
    selfLinkAsOrigin: true,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsTarget
    }
  }),
  [EntityType.A_FORK]: new EntityTypeExtendedInfo({
    label: 'Fork',
    props: [EntityProp.ORIGINID],
    height: 200,
    width: 20,
    linkableTypes: ANodeEntities,
    selfLinkAsTarget: true,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsOrigin
    }
  }),
  [EntityType.A_JOIN]: new EntityTypeExtendedInfo({
    label: 'Join',
    props: [EntityProp.TARGETID],
    height: 200,
    width: 20,
    linkableTypes: ANodeEntities,
    selfLinkAsOrigin: true,
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsTarget
    }
  }),
  [EntityType.A_OBJ]: new EntityTypeExtendedInfo({
    label: 'Objeto',
    props: [EntityProp.TITLE],
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsOrigin,
      [EntityType.A_EXCEPTION]: createAsOrigin,
      [EntityType.A_ACTION]: createEmpty
    }
  }),
  [EntityType.A_ASSOCIATION]: new EntityTypeExtendedInfo({
    label: 'Associação',
    props: [EntityProp.TITLE, EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: ANodeEntities
  }),
  [EntityType.A_EXCEPTION]: new EntityTypeExtendedInfo({
    label: 'Exceção',
    props: [EntityProp.TITLE, EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: ANodeEntities
  }),
  [EntityType.A_SWINLANE]: new EntityTypeExtendedInfo({
    label: 'Raia',
    props: [EntityProp.TITLE],
    height: 1000,
    width: 500,
    background: true,
    quickCreates: {
      [EntityType.A_SWINLANE]: entity => ({
        x: entity.x + entity.width,
        y: entity.y,
        width: entity.width,
        height: entity.height
      }),
      [EntityType.A_ACTION]: entity => ({
        x: entity.x + entity.width / 2,
        y: entity.y + entity.height * 0.1
      })
    }
  })
}
