import { DiagramType } from '~/models/enum/diagram-type'
import { DiagramTypeExtendedInfo } from '~/classes/diagram/DiagramTypeExtendedInfo'
import { UCEntities, AEntities } from '~/classes/entity/helpers'

export const DiagramTypeInfo = {
  [DiagramType.USECASE]: new DiagramTypeExtendedInfo({
    label: 'Caso de Uso',
    icon: 'mdi-account-arrow-right-outline',
    entityTypes: UCEntities
  }),
  [DiagramType.ACTIVITIES]: new DiagramTypeExtendedInfo({
    label: 'Atividades',
    icon: 'mdi-gesture-tap',
    entityTypes: AEntities
  }),
  [DiagramType.CLASSES]: new DiagramTypeExtendedInfo({
    label: 'Classes',
    icon: 'mdi-book-multiple'
  })
}
