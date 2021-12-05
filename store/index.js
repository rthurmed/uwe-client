import { use, install, Database } from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { Project } from '~/models/project'
import { Permission } from '~/models/permission'
import { Diagram } from '~/models/diagram'
import { User } from '~/models/user'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'
import { Style } from '~/classes/editor/Style'

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

export const state = () => ({
  style: Style,
  currentParticipant: null
})

export const mutations = {
  socket_join (state, payload) {
    payload.diagramId = Number(payload.diagramId)
    payload.grabbedId = Number(payload.grabbedId)
    Participant.insertOrUpdate({ data: payload })
  },
  socket_leave (state, payload) {
    Participant.delete(payload)
  },
  socket_me (state, payload) {
    state.currentParticipant = payload
  },
  socket_move (state, payload) {
    Participant.update({
      where: payload.participantId,
      data: {
        x: payload.x,
        y: payload.y
      }
    })
  },
  socket_create (state, payload) {
    payload.diagramId = Number(payload.diagramId)
    Entity.insertOrUpdate({ data: payload })
  },
  socket_patch (state, payload) {
    Entity.insertOrUpdate({ data: payload })
  },
  socket_delete (state, payload) {
    Entity.delete(payload)
  },
  socket_grab (state, payload) {
    Participant.update({
      where: payload.participantId,
      data: {
        grabbedId: payload.entityId
      }
    })
  },
  socket_drop (state, payload) {
    Participant.update({
      where: payload.participantId,
      data: {
        grabbedId: null
      }
    })
  }
}
