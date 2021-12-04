import { SuplementaryInfo } from '~/util'

export const EntityType = {
  // PACKAGE: 10,
  NOTE: 11,
  ACTOR: 12,
  USECASE: 13,
  ASSOCIATION: 14,
  GENERALIZATION: 15,
  EXTEND: 16,
  INCLUDE: 17
}

export const EntityTypeInfo = {
  [EntityType.PACKAGE]: new SuplementaryInfo({
    label: 'Pacote'
    //
  }),
  [EntityType.NOTE]: new SuplementaryInfo({
    label: 'Nota'
    //
  }),
  [EntityType.ACTOR]: new SuplementaryInfo({
    label: 'Ator'
    //
  }),
  [EntityType.USECASE]: new SuplementaryInfo({
    label: 'Caso de Uso'
    //
  }),
  [EntityType.ASSOCIATION]: new SuplementaryInfo({
    label: 'Associação'
    //
  }),
  [EntityType.GENERALIZATION]: new SuplementaryInfo({
    label: 'Generalização'
    //
  }),
  [EntityType.EXTEND]: new SuplementaryInfo({
    label: 'Extend'
    //
  }),
  [EntityType.INCLUDE]: new SuplementaryInfo({
    label: 'Include'
    //
  })
}
