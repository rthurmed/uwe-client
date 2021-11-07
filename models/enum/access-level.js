import { SuplementaryInfo } from '~/util'

export const AccessLevel = {
  NONE: -1,
  READ: 0,
  WRITE: 1,
  OWNER: 2
}

export const AccessLevelInfo = {
  [AccessLevel.NONE]: new SuplementaryInfo({
    label: 'Não definido'
  }),
  [AccessLevel.READ]: new SuplementaryInfo({
    label: 'Visualizador',
    icon: 'mdi-account-eye'
  }),
  [AccessLevel.WRITE]: new SuplementaryInfo({
    label: 'Editor',
    icon: 'mdi-account-edit'
  }),
  [AccessLevel.OWNER]: new SuplementaryInfo({
    label: 'Proprietário',
    icon: 'mdi-account-key'
  })
}
