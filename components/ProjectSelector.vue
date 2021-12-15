<template>
  <v-container>
    <!-- Project selector -->
    <v-system-bar class="mb-2" color="transparent">
      <span>
        Projetos recentes
      </span>
      <TextSeparator />
      <a href="#">
        Pesquisar projeto
      </a>
    </v-system-bar>
    <v-container class="d-flex justify-center">
      <v-menu
        v-for="project in projects"
        :key="project.id"
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
            @click="() => $emit('input', project.id)"
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
  </v-container>
</template>

<script>
import { AccessLevel } from '~/models/enum/access-level'
import { Project } from '~/models/project'
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
      AccessLevel
    }
  },
  computed: {
    allProjects () {
      return Project
        .query()
        .orderBy('id')
        .limit(6) // Max amount of projects to display
        // To see more you must search
        .get()
    },
    projects () {
      return this.allProjects
        .filter(project => project.isAllowed(this.$auth.user.sub, [
          AccessLevel.READ,
          AccessLevel.WRITE,
          AccessLevel.OWNER
        ]))
    }
  },
  created () {
    Project
      .api()
      .get(Project.entity, { dataKey: 'items' })
      .then(() => {
        if (this.projects.length > 0) {
          this.$emit('input', this.projects[0].id)
        }
      })
  },
  methods: {
    showCreate () {
      this.showingMenuCreateProject = true
    }
  }
}
</script>
