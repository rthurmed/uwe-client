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
          >
            <v-icon size="32">
              mdi-notebook
            </v-icon>
          </AvatarCard>
          <v-menu
            offset-y
            :close-on-content-click="false"
          >
            <template #activator="{ on, attrs }">
              <AvatarCard
                title="Criar Projeto"
                v-bind="attrs"
                v-on="on"
                @click="openCreatePopup"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </AvatarCard>
            </template>
            <CreateProjectCard
              @created="response => { selected = response.data.id }"
            />
          </v-menu>
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
                <v-row>
                  <v-col cols="3">
                    <!--  -->
                  </v-col>
                  <v-col class="d-flex justify-center align-center">
                    Diagramas
                  </v-col>
                  <v-col cols="3" class="d-flex justify-end">
                    <v-btn icon>
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider />
              <v-list>
                <v-list-item v-if="diagrams.length < 1">
                  <v-list-item-content class="text-center">
                    <v-list-item-subtitle>
                      Este projeto ainda não possue diagramas
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="diagram in diagrams"
                  :key="diagram.id"
                >
                  <v-list-item-avatar color="grey darken-2">
                    <v-icon color="white">
                      {{ DiagramTypeInfo[diagram.type].icon }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ diagram.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Criado em {{ diagram.createdAt | unixtime }}
                      <TextSeparator />
                      <span>
                        {{ DiagramTypeInfo[diagram.type].label }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <!-- Members list -->
          <v-col cols="12" sm="5" lg="3" order="0" order-sm="1">
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col cols="3">
                    <!--  -->
                  </v-col>
                  <v-col class="d-flex justify-center align-center">
                    Membros
                  </v-col>
                  <v-col cols="3" class="d-flex justify-end">
                    <v-btn icon>
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider />
              <v-list>
                <v-list-item
                  v-for="permission in permissions"
                  :key="permission.id"
                  three-line
                >
                  <v-list-item-avatar color="grey darken-2">
                    <v-icon color="white">
                      {{ AccessLevelInfo[permission.level].icon }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ permission.userId }}
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
                      Entrou em {{ permission.createdAt | unixtime }}
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
import { DiagramTypeInfo } from '~/models/enum/diagram-type'
import { AccessLevelInfo } from '~/models/enum/access-level'
import { Permission } from '~/models/permission'
import { Project } from '~/models/project'

export default {
  data () {
    return {
      selected: null,
      DiagramTypeInfo,
      AccessLevelInfo
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
      params: {
        limit: 6 // Max amount of projects to display
        // To see more you must search
      },
      dataKey: 'items'
    })
      .then(({ entities }) => {
        // Select first project if possible
        if (Project.entity in entities && entities[Project.entity].length > 0) {
          this.selected = entities[Project.entity][0].id
        }
      })
  },
  methods: {
    openCreatePopup: () => {}
  }
}
</script>
