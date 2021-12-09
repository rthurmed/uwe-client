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
        <span v-if="user">
          {{ user.firstName }}
          {{ user.lastName }}
        </span>
        <v-skeleton-loader v-else type="text" />
        <span v-if="permission.accepted == false">
          (Pendente)
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>
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
  </v-list-item>
</template>

<script>
import { AccessLevelInfo } from '~/models/enum/access-level'
import { Permission } from '~/models/permission'
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
      AccessLevelInfo
    }
  },
  computed: {
    permission () {
      return Permission.find(this.permissionId)
    },
    user () {
      return User.find(this.permission.userId)
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
  }
}
</script>
