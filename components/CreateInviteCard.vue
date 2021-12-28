<template>
  <v-card>
    <v-subheader class="justify-center">
      Convidar para o projeto
    </v-subheader>
    <v-card-text>
      <v-form @submit.prevent="createInvite">
        <v-text-field
          id="create-invite-email"
          v-model="email"
          label="E-mail"
          placeholder="usuario@email.com"
          hint="Insira o e-mail de um usuário cadastrado"
          autofocus
          aria-required="true"
          :error="error.show && (error.type == 'request' || error.type == 'user')"
        />
        <v-select
          id="create-invite-access-level"
          v-model="accessLevel"
          label="Nível de acesso"
          :items="accessLevelOptions"
        />
        <v-btn
          id="create-invite-submit"
          type="submit"
          block
        >
          Enviar
        </v-btn>
      </v-form>
      <v-alert
        v-model="error.show"
        dismissible
        type="error"
        class="mt-2"
      >
        <span v-if="error.type == 'email'">
          Insira um usuário cadastrado!
        </span>
        <span v-if="error.type == 'member'">
          Este usuário já é um membro!
        </span>
        <span v-else-if="error.type == 'request'">
          Verifique os valores inseridos!
        </span>
        <span v-else>
          Erro desconhecido! Tente novamente mais tarde.
        </span>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { Permission } from '~/models/permission'
import { AccessLevel, AccessLevelInfo } from '~/models/enum/access-level'

export default {
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  data () {
    const accessLevels = { ...AccessLevel }
    delete accessLevels.NONE
    return {
      email: '',
      accessLevel: AccessLevel.READ,
      accessLevels,
      error: {
        show: false,
        type: 'user'
      }
    }
  },
  computed: {
    accessLevelOptions () {
      return Object
        .values(this.accessLevels)
        .map(e => ({
          id: `create-invite-access-level-option-${e}`,
          text: AccessLevelInfo[e].label,
          value: e
        }))
    }
  },
  methods: {
    createInvite () {
      Permission
        .api()
        .post(`${Permission.entity}`, {
          level: this.accessLevel,
          email: this.email,
          projectId: this.projectId
        })
        .then((e) => {
          this.$emit('response', e)
          this.email = ''
        })
        .catch((e) => {
          if (e.response.status === 400) {
            if (e.response.data.message === 'User not found') {
              this.error.type = 'email'
            } else if (e.response.data.message === 'User already member') {
              this.error.type = 'member'
            } else {
              this.error.type = 'request'
            }
          } else {
            this.error.type = 'unknown'
          }
          this.error.show = true
        })
    }
  }
}
</script>
