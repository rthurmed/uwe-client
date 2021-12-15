<template>
  <v-container>
    <v-system-bar color="transparent">
      Seu perfil
    </v-system-bar>
    <v-row justify="center">
      <v-col cols="12" sm="5" lg="3" class="text-center">
        <v-avatar size="192" color="grey darken-2" class="mb-3" />
        <p>
          {{ $auth.user.name }}
          <br>
          {{ $auth.user.email }}
        </p>
        <p>
          <a href="#" @click="$auth.logout()">Deslogar</a>
          <br>
          <a :href="$root.context.env.keycloakAccountURL" target="_blank">Editar dados</a>
          <!-- <br>
          <span class="text--disabled">Remover minha conta</span> -->
        </p>
      </v-col>
      <v-col cols="12" sm="7" lg="5">
        <!-- Invites -->
        <v-card>
          <v-card-title class="justify-center">
            Convites pendentes
          </v-card-title>
          <v-divider />
          <v-card-text v-if="invites.length < 1">
            Você ainda não tem nenhum convite
          </v-card-text>
          <v-list v-else>
            <template v-for="invite in invites">
              <InviteListItem
                :key="invite.id"
                :invite-id="invite.id"
              />
              <v-divider :key="`${invite.id}-divider`" />
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Permission } from '~/models/permission'
import { Project } from '~/models/project'
export default {
  head () {
    return {
      title: 'Seu perfil'
    }
  },
  computed: {
    invites () {
      return Permission
        .query()
        .where('userId', this.$auth.user.sub)
        .where('accepted', false)
        .where('revoked', false)
        .get()
    }
  },
  created () {
    Permission
      .api()
      .get(`${Permission.entity}/invites`, {
        dataKey: 'items'
      })
      .then(({ response }) => {
        response.data.items.forEach((permission) => {
          Project.insertOrUpdate({
            data: permission.project
          })
        })
      })
  }
}
</script>
