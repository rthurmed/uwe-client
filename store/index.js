import { use, install, Database } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { Project } from '~/models/project'
import { Permission } from '~/models/permission'
import { Diagram } from '~/models/diagram'
import { User } from '~/models/user'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'

// https://vuex-orm.github.io/plugin-axios/guide/setup.html#nuxt-js-integration

use(VuexORMAxios)

const database = new Database()

// Every model must be added here
database.register(Project)
database.register(Permission)
database.register(Diagram)
database.register(User)
database.register(Entity)
database.register(Participant)

export const plugins = [
  install(database)
]

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

export const mutations = {
  socket_join (state, payload) {
    Participant.create({ data: payload })
  }
}
