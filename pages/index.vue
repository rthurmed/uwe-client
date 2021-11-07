<template>
  <v-row>
    <v-col cols="12">
      <v-container>
        <!-- Project selector -->
        <v-system-bar color="transparent">
          <span>
            Projetos recentes
          </span>
          <TextSeparator />
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
        <v-row justify="center">
          <!-- Diagrams list -->
          <v-col cols="12" sm="7" lg="5" order="1" order-sm="0">
            <v-card>
              <v-card-title class="justify-center">
                Diagramas
              </v-card-title>
              <v-divider />
              <v-list>
                <v-list-item
                  v-for="diagram in diagrams"
                  :key="diagram.id"
                >
                  <v-list-item-avatar color="grey" />
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ diagram.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ diagram.createdAt }}
                      <TextSeparator />
                      {{ diagram.type }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <!-- Members list -->
          <v-col cols="12" sm="5" lg="3" order="0" order-sm="1">
            <v-card>
              <v-card-title class="justify-center">
                Membros
              </v-card-title>
              <v-divider />
              <v-list>
                <v-list-item
                  v-for="permission in permissions"
                  :key="permission.id"
                  three-line
                >
                  <v-list-item-avatar color="grey" />
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ permission.userId }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ permission.level }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { Diagram } from '~/models/diagram'
import { Permission } from '~/models/permission'
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
    },
    diagrams () {
      return Diagram.query().where('projectId', this.selected).get()
    },
    permissions () {
      return Permission.query().where('projectId', this.selected).get()
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
