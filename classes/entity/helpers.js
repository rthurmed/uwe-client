import { EntityType } from '~/models/enum/entity-type'

// Use Case diagram entity types

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

export const UCEntities = [
  ...UCNodeEntities,
  ...UCLinkEntities
]

// Activity diagram entity types

export const ANodeEntities = [
  EntityType.A_ACTION,
  EntityType.A_START,
  EntityType.A_END,
  EntityType.A_END_FLOW,
  EntityType.A_BRANCH,
  EntityType.A_MERGE,
  EntityType.A_FORK,
  EntityType.A_JOIN,
  EntityType.A_OBJ
]

export const ALinkEntities = [
  EntityType.A_ASSOCIATION,
  EntityType.A_EXCEPTION
]

export const ABackgroundEntities = [
  EntityType.A_SWINLANE
]

export const AEntities = [
  ...ANodeEntities,
  ...ALinkEntities,
  ...ABackgroundEntities
]
