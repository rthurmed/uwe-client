<template>
  <v-card>
    <v-form @submit.prevent="submit">
      <!-- <v-card-text class="text-center">
        <v-avatar size="128" color="grey" />
      </v-card-text> -->
      <v-list-item>
        <v-text-field
          v-model="project.name"
          label="Nome"
          autofocus
        />
      </v-list-item>
      <v-card-actions>
        <v-btn type="submit" block class="text-center">
          Enviar
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { Project } from '~/models/project'
export default {
  data () {
    return {
      project: {
        name: ''
      }
    }
  },
  methods: {
    clear () {
      this.project.name = ''
    },
    submit () {
      Project
        .api()
        .post(Project.entity, this.project)
        .then(({ response }) => {
          this.$emit('created', response)
          this.clear()
        })
        .catch(() => {
          // TODO: Show error using snackbar
        })
    }
  }
}
</script>
