<template>
  <v-list-item
    three-line
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list-item-content>
      <v-list-item-title v-if="project">
        Convite para: {{ project.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Nível de acesso: {{ AccessLevelInfo[invite.level].label }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <a @click="accept">
          Aceitar
        </a>
        <TextSeparator />
        <a @click="discard">
          Descartar
        </a>
      </v-list-item-subtitle>
    </v-list-item-content>
    <!-- <v-list-item-avatar>
      <v-avatar color="grey" />
    </v-list-item-avatar> -->
  </v-list-item>
</template>

<script>
import { AccessLevelInfo } from '~/models/enum/access-level'
import { Permission } from '~/models/permission'
import { Project } from '~/models/project'

export default {
  props: {
    inviteId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      AccessLevelInfo
    }
  },
  computed: {
    invite () {
      return Permission.find(this.inviteId)
    },
    project () {
      const permission = Permission.find(this.inviteId)
      if (permission == null) {
        return null
      }
      return Project.find(permission.projectId)
    }
  },
  methods: {
    accept () {
      Permission
        .api()
        .post(`${Permission.entity}/accept/${this.inviteId}`, {
          accepted: true
        })
    },
    discard () {
      Permission
        .api()
        .delete(`${Permission.entity}/${this.inviteId}`)
        .then(() => {
          Permission.delete(this.inviteId)
        })
    }
  }
}
</script>
