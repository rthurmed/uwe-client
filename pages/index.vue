<template>
  <v-row>
    <v-col cols="12">
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
                :highlight="project.id === selected"
                v-bind="attrs"
                v-on="(
                  project.isAllowed($auth.user.sub, [AccessLevel.OWNER]) &&
                  project.id === selected
                ) ? on : null"
                @click="() => selected = project.id"
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
                selected = response.data.id
              }"
            />
          </v-menu>
        </v-container>
      </v-container>
      <v-divider />
      <v-container v-if="focusedProject == null" class="text-center">
        <p v-if="projects.length > 0">
          Para ver as informações de um projeto existente ou criar um novo, selecione uma opção acima.
        </p>
        <p v-else>
          Você ainda não tem nenhum projeto.
          <a href="#" @click="showingMenuCreateProject = true">Crie um novo projeto.</a>
        </p>
      </v-container>
      <v-container v-else>
        <v-system-bar class="mb-2" color="transparent">
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
          <v-col
            cols="12"
            md="7"
            lg="6"
            xl="5"
            order="1"
            order-md="0"
          >
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
                    <v-menu
                      v-model="showingMenuCreateDiagram"
                      offset-y
                      min-width="300"
                      :close-on-content-click="false"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </template>
                      <CreateDiagramCard
                        :project-id="selected"
                        @response="showingMenuCreateDiagram = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider />
              <v-list>
                <v-list-item v-if="diagrams.length < 1">
                  <v-list-item-content>
                    <v-list-item-subtitle class="text-center">
                      Este projeto ainda não possue diagramas.
                      <p class="text-caption">
                        Para criar um diagrama, escolha uma opção ou clique no botão "+".
                      </p>
                    </v-list-item-subtitle>
                    <v-row>
                      <v-col
                        v-for="type in Object.values(DiagramType)"
                        :key="type"
                      >
                        <v-card
                          elevation="0"
                          class="text-center"
                          @click="() => createDiagram(type)"
                        >
                          <v-card-text>
                            <v-icon>
                              {{ DiagramTypeInfo[type].icon }}
                            </v-icon>
                          </v-card-text>
                          <v-card-actions class="text--secondary justify-center">
                            {{ DiagramTypeInfo[type].label }}
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="diagram in diagrams"
                  :key="diagram.id"
                  :to="`d/${diagram.id}`"
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
                      Criado em {{ diagram.createdAt | unixdate }}
                      <TextSeparator />
                      <span>
                        {{ DiagramTypeInfo[diagram.type].label }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu left :close-on-content-click="false">
                      <template #activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click.prevent="() => {}"
                        >
                          <v-icon>
                            mdi-chevron-down
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-list subheader>
                        <v-subheader>
                          Gerenciar diagrama
                        </v-subheader>
                        <v-list-item @click="() => {}">
                          <v-list-item-icon>
                            <v-icon>
                              mdi-image
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>
                              Exportar como imagem
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="() => {}">
                          <v-list-item-icon>
                            <v-icon>
                              mdi-file-download
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>
                              Exportar como arquivo
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="removeDiagram(diagram.id)">
                          <v-list-item-icon>
                            <v-icon>
                              mdi-delete
                            </v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>
                              Remover
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <!-- Members list -->
          <v-col
            cols="12"
            md="5"
            lg="4"
            xl="3"
            order="0"
            order-md="1"
          >
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
                    <v-menu
                      left
                      :close-on-content-click="false"
                      min-width="300"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </template>
                      <CreateInviteCard :project-id="selected" />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider />
              <v-list>
                <MemberListItem
                  v-for="permission in permissions"
                  :key="permission.id"
                  :permission-id="permission.id"
                />
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
import { DiagramType, DiagramTypeInfo } from '~/models/enum/diagram-type'
import { AccessLevel, AccessLevelInfo } from '~/models/enum/access-level'
import { Permission } from '~/models/permission'
import { Project } from '~/models/project'

export default {
  data () {
    return {
      selected: null,
      AccessLevel,
      DiagramType,
      AccessLevelInfo,
      DiagramTypeInfo,
      showingMenuProjects: {},
      showingMenuCreateProject: false,
      showingMenuCreateDiagram: false
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
  watch: {
    selected (value) {
      if (value) {
        Project.api().get(`${Project.entity}/${value}`)
      }
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
    createDiagram (type) {
      Diagram
        .api()
        .post(Diagram.entity, {
          type,
          name: 'Diagrama sem nome',
          projectId: this.selected
        })
    },
    removeDiagram (id) {
      Diagram
        .api()
        .delete(`${Diagram.entity}/${id}`)
        .then(() => {
          Diagram.delete(id)
        })
        .catch(() => {
          //
        })
    }
  }
}
</script>
