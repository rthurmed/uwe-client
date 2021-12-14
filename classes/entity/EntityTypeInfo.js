import { EntityType } from '~/models/enum/entity-type'
import { EntityTypeExtendedInfo } from '~/classes/entity/EntityTypeExtendedInfo'
import { EntityProp } from '~/classes/entity/EntityProp'
import { ANodeEntities, UCNodeEntities } from '~/classes/entity/helpers'
import { createAsTarget, createAsOrigin, createEmpty } from '~/classes/entity/quickCreates'

export const EntityTypeInfo = {
  // USE CASE
  [EntityType.NOTE]: new EntityTypeExtendedInfo({
    label: 'Nota',
    icon: '/icons/gaphor-comment-symbolic.svg',
    height: 200,
    width: 200,
    props: [EntityProp.TITLE],
    quickCreates: {
      [EntityType.ASSOCIATION]: createAsOrigin
    }
  }),
  [EntityType.ACTOR]: new EntityTypeExtendedInfo({
    label: 'Ator',
    icon: '/icons/gaphor-actor-symbolic.svg',
    props: [EntityProp.TITLE, EntityProp.ABSTRACT],
    quickCreates: {
      [EntityType.ASSOCIATION]: createAsOrigin,
      [EntityType.GENERALIZATION]: createAsTarget
    }
  }),
  [EntityType.USECASE]: new EntityTypeExtendedInfo({
    label: 'Caso de Uso',
    icon: '/icons/gaphor-use-case-symbolic.svg',
    height: 100,
    width: 200,
    props: [EntityProp.TITLE, EntityProp.ABSTRACT],
    quickCreates: {
      [EntityType.ASSOCIATION]: createAsTarget,
      [EntityType.EXTEND]: createAsOrigin,
      [EntityType.INCLUDE]: createAsOrigin
    }
  }),
  [EntityType.ASSOCIATION]: new EntityTypeExtendedInfo({
    label: 'Associação',
    icon: '/icons/gaphor-line-symbolic.svg',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  [EntityType.GENERALIZATION]: new EntityTypeExtendedInfo({
    label: 'Generalização',
    icon: '/icons/gaphor-generalization-symbolic.svg',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  [EntityType.EXTEND]: new EntityTypeExtendedInfo({
    label: 'Extend',
    icon: '/icons/gaphor-extend-symbolic.svg',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  [EntityType.INCLUDE]: new EntityTypeExtendedInfo({
    label: 'Include',
    icon: '/icons/gaphor-include-symbolic.svg',
    props: [EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: UCNodeEntities
  }),
  // ACTIVITIES
  [EntityType.A_ACTION]: new EntityTypeExtendedInfo({
    label: 'Ação',
    icon: '/icons/gaphor-action-symbolic.svg',
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
    icon: '/icons/gaphor-initial-node-symbolic.svg',
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
    icon: '/icons/gaphor-final-state-symbolic.svg',
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
    icon: '/icons/gaphor-flow-final-node-symbolic.svg',
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
    icon: '/icons/gaphor-decision-node-symbolic.svg',
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
    icon: '/icons/gaphor-undeveloped-event-symbolic.svg',
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
    icon: '/icons/gaphor-fork-node-symbolic.svg',
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
    icon: '/icons/gaphor-join-node-symbolic.svg',
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
    icon: '/icons/gaphor-object-node-symbolic.svg',
    props: [EntityProp.TITLE],
    quickCreates: {
      [EntityType.A_ASSOCIATION]: createAsOrigin,
      [EntityType.A_EXCEPTION]: createAsOrigin,
      [EntityType.A_ACTION]: createEmpty
    }
  }),
  [EntityType.A_ASSOCIATION]: new EntityTypeExtendedInfo({
    label: 'Associação',
    icon: '/icons/gaphor-control-flow-symbolic.svg',
    props: [EntityProp.TITLE, EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: ANodeEntities
  }),
  [EntityType.A_EXCEPTION]: new EntityTypeExtendedInfo({
    label: 'Exceção',
    icon: '/icons/gaphor-realization-symbolic.svg',
    props: [EntityProp.TITLE, EntityProp.ORIGINID, EntityProp.TARGETID],
    linkableTypes: ANodeEntities
  }),
  [EntityType.A_SWINLANE]: new EntityTypeExtendedInfo({
    label: 'Raia',
    icon: '/icons/gaphor-activity-partition-symbolic.svg',
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
