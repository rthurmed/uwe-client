import { SuplementaryInfo } from '~/classes/SuplementaryInfo'

export const DiagramType = {
  USECASE: 0,
  ACTIVITIES: 1 //,
  // CLASSES: 2
}

export const DiagramTypeInfo = {
  [DiagramType.USECASE]: new SuplementaryInfo({
    label: 'Caso de Uso',
    icon: 'mdi-account-arrow-right-outline'
  }),
  [DiagramType.ACTIVITIES]: new SuplementaryInfo({
    label: 'Atividades',
    icon: 'mdi-gesture-tap'
  }),
  [DiagramType.CLASSES]: new SuplementaryInfo({
    label: 'Classes',
    icon: 'mdi-book-multiple'
  })
}
