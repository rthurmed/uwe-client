import { use, install, Database } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { Project } from '~/models/project'

// https://vuex-orm.github.io/plugin-axios/guide/setup.html#nuxt-js-integration

use(VuexORMAxios)

const database = new Database()

// Every model must be added here
database.register(Project)

export const plugins = [
  install(database)
]
