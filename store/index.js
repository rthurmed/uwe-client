import { use, install, Database } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { Project } from '~/models/project'
import { Permission } from '~/models/permission'
import { Diagram } from '~/models/diagram'
import { User } from '~/models/user'

// https://vuex-orm.github.io/plugin-axios/guide/setup.html#nuxt-js-integration

use(VuexORMAxios)

const database = new Database()

// Every model must be added here
database.register(Project)
database.register(Permission)
database.register(Diagram)
database.register(User)

export const plugins = [
  install(database)
]

// TODO: Implement editor module

/*
Possible socket_ messages:
- join
- leave
- create
- patch
- delete
- grab
- drop
*/

export const state = {
  users: []
}

export const mutations = {
  socket_join (state, payload) {
    console.log(payload)
  },
  socket_context (state, payload) {
    console.log(payload)
  }
}
