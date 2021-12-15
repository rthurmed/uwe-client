<template>
  <v-container>
    <!-- Project selector -->
    <v-system-bar class="mb-2" color="transparent">
      <span>
        Projetos recentes
      </span>
      <TextSeparator />
      <a @click="showingSearch = !showingSearch">
        <span v-if="showingSearch">
          Cancelar
        </span>
        <span v-else>
          Pesquisar projeto
        </span>
      </a>
    </v-system-bar>
    <v-row
      v-if="showingSearch"
      class="d-flex justify-center align-center"
    >
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-text-field
          v-model="query"
          solo
          full-width
          autofocus
          prepend-inner-icon="mdi-magnify"
          label="Insira o nome de um projeto para pesquisar"
          hint="Insira ao menos 2 caracteres. Aperte enter para selecionar"
          @input="(e) => {
            if (e.length > 1) {
              loadProjects()
            }
          }"
          @keydown.esc="showingSearch = false"
          @keydown.enter="selectFirst(); showingSearch = false"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="10" xl="7">
        <v-container class="d-flex justify-center flex-wrap">
          <v-menu
            v-for="project in projects"
            :key="`project-${project.id}`"
            v-model="showingMenuProjects[project.id]"
            offset-y
            :close-on-content-click="false"
          >
            <template #activator="{ on, attrs }">
              <AvatarCard
                :title="project.name"
                :highlight="project.id === value"
                v-bind="attrs"
                v-on="(
                  project.isAllowed($auth.user.sub, [AccessLevel.OWNER]) &&
                  project.id === value
                ) ? on : null"
                @click="() => {
                  $emit('input', project.id); showingSearch = false
                }"
              >
                <v-icon size="32">
                  mdi-notebook
                </v-icon>
              </AvatarCard>
            </template>
            <UpdateProjectCard
              :entity-id="project.id"
              @response="showingMenuProjects[project.id] = false"
            />
          </v-menu>
          <v-menu
            v-if="!showingSearch"
            v-model="showingMenuCreateProject"
            offset-y
            :close-on-content-click="false"
          >
            <template #activator="{ on, attrs }">
              <AvatarCard
                title="Criar Projeto"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </AvatarCard>
            </template>
            <CreateProjectCard
              @created="response => {
                showingMenuCreateProject = false
                $emit('input', response.data.id)
              }"
            />
          </v-menu>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AccessLevel } from '~/models/enum/access-level'
import { Project } from '~/models/project'

const PROJECT_COUNT_SEARCH = 12
const PROJECT_COUNT_LIST = 4

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      showingMenuProjects: {},
      showingMenuCreateProject: false,
      showingSearch: false,
      AccessLevel,
      query: ''
    }
  },
  computed: {
    allProjects () {
      return Project
        .query()
        .orderBy('id', 'desc')
        .limit(this.showingSearch
          ? PROJECT_COUNT_SEARCH
          : PROJECT_COUNT_LIST
        )
        // Max amount of projects to display
        // To see more you must search
        .get()
    },
    projects () {
      return this.allProjects
        .filter(project => (
          project.isAllowed(this.$auth.user.sub, [
            AccessLevel.READ,
            AccessLevel.WRITE,
            AccessLevel.OWNER
          ]) &&
          (
            !this.showingSearch ||
            project.name.includes(this.query)
          )
        ))
    }
  },
  watch: {
    showingSearch (value) {
      if (!value) {
        this.query = ''
      }
    }
  },
  created () {
    Project
      .api()
      .get(Project.entity, {
        query: {
          limit: PROJECT_COUNT_SEARCH
        },
        dataKey: 'items'
      })
      .then(() => {
        this.selectFirst()
      })
  },
  methods: {
    showCreate () {
      this.showingMenuCreateProject = true
    },
    selectFirst () {
      if (this.projects.length > 0) {
        this.$emit('input', this.projects[0].id)
      }
    },
    loadProjects () {
      Project
        .api()
        .get(Project.entity, {
          query: {
            limit: PROJECT_COUNT_SEARCH,
            name: this.query
          },
          dataKey: 'items'
        })
    }
  }
}
</script>
