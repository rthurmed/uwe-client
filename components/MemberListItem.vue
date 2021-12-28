<template>
  <v-list-item
    three-line
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list-item-avatar color="grey darken-2">
      <v-icon color="white">
        {{ AccessLevelInfo[permission.level].icon }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <span
          v-if="user"
          class="member-name"
        >
          {{ user.firstName }}
          {{ user.lastName }}
        </span>
        <v-skeleton-loader v-else type="text" />
        <span v-if="permission.accepted == false">
          (Pendente)
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span class="member-access-level">
          {{ AccessLevelInfo[permission.level].label }}
        </span>
        <span v-if="$auth.user.sub === permission.userId">
          (Você)
        </span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        Entrou em {{ permission.createdAt | unixdate }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="project && project.isAllowed($auth.user.sub, [AccessLevel.OWNER])">
      <v-menu left>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            class="member-menu"
            v-bind="attrs"
            v-on="on"
            @click.prevent="() => {}"
          >
            <v-icon>
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list subheader>
          <v-subheader v-if="user">
            Mudar a permissão para
            {{ user.firstName }}
            {{ user.lastName }}
          </v-subheader>
          <v-list-item
            v-for="level in levels"
            :id="`member-edit-permission-${level}`"
            :key="level"
            @click="() => changeLevel(level)"
          >
            <v-list-item-icon>
              <v-icon>
                {{ AccessLevelInfo[level].icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Definir como {{ AccessLevelInfo[level].label }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            id="member-edit-remove"
            @click="remove"
          >
            <v-list-item-icon>
              <v-icon>
                mdi-delete
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Remover
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { AccessLevel, AccessLevelInfo } from '~/models/enum/access-level'
import { Permission } from '~/models/permission'
import { Project } from '~/models/project'
import { User } from '~/models/user'

export default {
  props: {
    permissionId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      levels: [
        AccessLevel.READ,
        AccessLevel.WRITE,
        AccessLevel.OWNER
      ],
      AccessLevel,
      AccessLevelInfo
    }
  },
  computed: {
    permission () {
      return Permission.find(this.permissionId)
    },
    user () {
      return User.find(this.permission.userId)
    },
    project () {
      return Project.find(this.permission.projectId)
    }
  },
  watch: {
    permissionId: {
      handler (value) {
        const { userId: id } = Permission.find(value)
        if (User.find(id) == null) {
          // Fetch if didnt loaded yet
          User.api().get(`${User.entity}/${id}`)
        }
      },
      immediate: true
    }
  },
  methods: {
    changeLevel (level) {
      Permission
        .api()
        .put(`${Permission.entity}/${this.permissionId}`, {
          level
        })
    },
    remove () {
      Permission
        .api()
        .delete(`${Permission.entity}/${this.permissionId}`)
        .then(() => {
          Permission.delete(this.permissionId)
        })
    }
  }
}
</script>
