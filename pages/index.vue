<template>
  <v-row>
    <v-col cols="12">
      <v-container>
        <!-- Project selector -->
        <v-system-bar color="transparent">
          <span>
            Projetos recentes
          </span>
          <span class="px-2">
            ·
          </span>
          <a href="#">
            Pesquisar projeto
          </a>
        </v-system-bar>
        <v-container class="d-flex justify-center">
          <AvatarCard
            v-for="project in projects"
            :key="project.id"
            :title="project.name"
            :highlight="project.id === selected"
            @click="() => selected = project.id"
          />
          <AvatarCard
            title="Criar Projeto"
            @click="openCreatePopup"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </AvatarCard>
        </v-container>
      </v-container>
      <v-divider />
      <v-container v-if="focusedProject != null">
        <v-system-bar color="transparent">
          <span>
            Projeto: {{ focusedProject.name }}
          </span>
          <v-spacer />
          <a href="#">
            Deixar este projeto
          </a>
        </v-system-bar>
        <!-- Diagrams list -->
        <!-- Members list -->
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { Project } from '~/models/project'

export default {
  data () {
    return {
      selected: null
    }
  },
  computed: {
    projects () {
      return Project.query().orderBy('id').get()
    },
    focusedProject () {
      return Project.find(this.selected)
    }
  },
  created () {
    Project.api().get(Project.entity, {
      dataKey: 'items'
    })
  },
  methods: {
    openCreatePopup: () => {}
  }
}
</script>
