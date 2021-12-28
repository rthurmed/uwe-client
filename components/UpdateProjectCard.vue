<template>
  <v-card>
    <v-system-bar color="transparent">
      <v-spacer />
      <!-- TODO: Ask for confirmation -->
      <a
        id="update-project-remove"
        href="#"
        @click="remove"
      >
        Remover
      </a>
    </v-system-bar>
    <v-form @submit.prevent="submit">
      <!-- <v-card-text class="text-center">
        <v-avatar size="128" color="grey" />
      </v-card-text> -->
      <v-list-item>
        <v-text-field
          id="update-project-name"
          v-model="project.name"
          label="Nome"
          autofocus
        />
      </v-list-item>
      <v-card-actions>
        <v-btn
          id="update-project-submit"
          type="submit"
          block
          class="text-center"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { Project } from '~/models/project'
export default {
  props: {
    entityId: {
      type: Number,
      default: () => -1
    }
  },
  data () {
    return {
      project: {
        name: ''
      }
    }
  },
  watch: {
    entityId: {
      handler (value) {
        const project = Project.find(value)
        if (project) {
          this.project.name = project.name
        }
      },
      immediate: true
    }
  },
  methods: {
    clear () {
      this.project.name = ''
    },
    submit () {
      Project
        .api()
        .put(`${Project.entity}/${this.entityId}`, this.project)
        .then(({ response }) => {
          this.$emit('response', response)
        })
        .catch(() => {
          // TODO: Show error using snackbar
        })
    },
    remove () {
      Project
        .api()
        .delete(`${Project.entity}/${this.entityId}`)
        .then(() => {
          Project.delete(this.entityId)
        })
        .catch(() => {
          // TODO: Show error using snackbar
        })
    }
  }
}
</script>
