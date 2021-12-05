import { EntityProp } from '~/classes/entity/EntityProp'
import { ExtendedInfo } from '~/classes/ExtendedInfo'

export const EntityPropInfo = {
  [EntityProp.ID]: new ExtendedInfo({
    label: 'ID',
    type: 'string',
    immutable: true
  }),
  [EntityProp.TYPE]: new ExtendedInfo({
    label: 'Tipo',
    type: 'EntityType',
    immutable: true
  }),
  [EntityProp.TITLE]: new ExtendedInfo({
    label: 'Titulo',
    type: 'string'
  }),
  [EntityProp.X]: new ExtendedInfo({
    label: 'X',
    type: 'number'
  }),
  [EntityProp.Y]: new ExtendedInfo({
    label: 'Y',
    type: 'number'
  }),
  [EntityProp.WIDTH]: new ExtendedInfo({
    label: 'Largura',
    type: 'number'
  }),
  [EntityProp.HEIGHT]: new ExtendedInfo({
    label: 'Altura',
    type: 'number'
  }),
  [EntityProp.ABSTRACT]: new ExtendedInfo({
    label: 'Abstrato',
    type: 'bool'
  }),
  [EntityProp.ORIGINID]: new ExtendedInfo({
    label: 'Origem',
    type: 'entity'
  }),
  [EntityProp.TARGETID]: new ExtendedInfo({
    label: 'Destino',
    type: 'entity'
  }),
  [EntityProp.CREATEDAT]: new ExtendedInfo({
    label: 'Criado em',
    type: 'unix',
    immutable: true
  })
}
