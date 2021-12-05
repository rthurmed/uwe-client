import { EntityType } from '~/models/enum/entity-type'

export const UCNodeEntities = [
  EntityType.NOTE,
  EntityType.ACTOR,
  EntityType.USECASE
]

export const UCLinkEntities = [
  EntityType.ASSOCIATION,
  EntityType.GENERALIZATION,
  EntityType.EXTEND,
  EntityType.INCLUDE
]
