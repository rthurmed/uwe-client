<template>
  <div class="fill-height">
    <!-- CUSTOM APP BAR -->
    <v-app-bar clipped-left clipped-right fixed app>
      <v-row>
        <v-col cols="2">
          <v-btn icon to="/">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
          <!-- INVITE USER FAB -->
          <!-- TODO: hide if not project owner -->
          <v-menu
            v-if="project !== null"
            v-model="showingInviteMenu"
            :close-on-content-click="false"
            min-width="300"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                fab
                small
                absolute
                style="left: 236px; top: 72px; z-index: 200;"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <CreateInviteCard
              :project-id="project.id"
              @response="showingInviteMenu = false"
            />
          </v-menu>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-menu
            v-model="editDiagramMenu.show"
            :close-on-content-click="false"
            min-width="340"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                id="diagrammenu-button"
                large
                depressed
                :loading="project == null || diagram == null"
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="project != null && diagram != null">
                  {{ project.name }} > {{ diagram.name }}
                </span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                Editar diagrama
                <v-spacer />
                <v-btn
                  id="diagrammenu-close"
                  icon
                  small
                  @click="editDiagramMenu.show = false"
                >
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitEditDiagram">
                  <v-text-field
                    id="diagrammenu-name"
                    v-model="editDiagramMenu.name"
                    label="Nome"
                  />
                  <v-btn
                    id="diagrammenu-submit"
                    type="submit"
                    block
                  >
                    Enviar
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-divider />
              <v-card-title>
                Opções de exportação
              </v-card-title>
              <v-list-item
                id="diagrammenu-export"
                @click="$refs.stage.exportAsImage(); editDiagramMenu.show = false"
              >
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
              <!-- <v-list-item @click="() => {}">
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
              </v-list-item> -->
            </v-card>
          </v-menu>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-tooltip
            v-if="myParticipant"
            bottom
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                to="/account"
                :color="$color(myParticipant.id)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-account
                </v-icon>
              </v-btn>
            </template>
            <span>
              Seu perfil
            </span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-app-bar>
    <!-- LEFT SIDE PANEL -->
    <v-navigation-drawer app clipped>
      <!-- AVATARS -->
      <v-toolbar flat style="overflow: auto; overflow-y: hidden;">
        <v-btn
          v-for="participant in participants"
          :key="participant.id"
          icon
          class="mr-1"
        >
          <ParticipantAvatar :participant-id="participant.id" />
        </v-btn>
        <v-menu v-if="otherParticipants.length > 0">
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list subheader>
            <v-subheader>
              Participantes
            </v-subheader>
            <ParticipantListItem
              v-for="participant in otherParticipants"
              :key="participant.id"
              :participant-id="participant.id"
              @click="() => {}"
            />
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider />
      <!-- DIAGRAM ESTRUCTURE -->
      <v-list subheader dense>
        <v-subheader>
          Estrutura do diagrama
        </v-subheader>
        <v-list-item class="pb-3">
          <!-- NEW ENTITY MENU -->
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                id="create-entity-button"
                block
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  mdi-plus
                </v-icon>
                Nova entidade
              </v-btn>
            </template>
            <v-list subheader>
              <v-subheader>
                Selecione o tipo da nova entidade:
              </v-subheader>
              <v-list-item
                v-for="type in entityTypes"
                :id="`create-entity-option-${type}`"
                :key="type"
                class="create-entity-option"
                large
                block
                @click="createEntity(type)"
              >
                <v-list-item-icon>
                  <v-img
                    max-width="24"
                    contain
                    :src="EntityTypeInfo[type].icon"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ EntityTypeInfo[type].label }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <v-list-item-group
          :value="grabbedId"
          @change="v => $socket.emit('grab', v)"
        >
          <v-list-item
            v-for="(entity, key) in entities"
            :id="`entity-item-${entity.id}`"
            :key="key"
            class="entity-item"
            :value="entity.id"
          >
            <v-list-item-icon>
              <v-img
                max-width="24"
                contain
                :src="EntityTypeInfo[entity.type].icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-if="entity.title">
                {{ entity.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ EntityTypeInfo[entity.type].label }}
                #{{ entity.id }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- RIGHT SIDE PANEL -->
    <v-navigation-drawer app right clipped>
      <EditorInspectPanel @edit="openEditMenu" />
    </v-navigation-drawer>
    <!-- MAIN CONTENT -->
    <v-row style="height: calc(100vh - 72px)">
      <v-col cols="12">
        <v-expand-transition>
          <v-alert
            v-show="!connected"
            prominent
            tile
            type="error"
            transition=""
          >
            <v-row align="center">
              <v-col class="grow">
                Você está desconectado!
              </v-col>
              <v-col class="shrink">
                <v-btn @click="connect">
                  Conectar novamente
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-expand-transition>
        <EditorStage
          ref="stage"
          :diagram-id="$route.params.id"
          @edit="openEditMenu"
        />
        <EditorPropMenu
          :show.sync="editMenu.show"
          :entity="editMenu.entity"
          :props="editMenu.props"
          :quick-creates="editMenu.quickCreates"
          :x="editMenu.x"
          :y="editMenu.y"
          @create="createEntity"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Query } from '@vuex-orm/core'
import { mapState } from 'vuex'
import { EntityTypeInfo } from '~/classes/entity/EntityTypeInfo'
import { Diagram } from '~/models/diagram'
import { Entity } from '~/models/entity'
import { EntityType } from '~/models/enum/entity-type'
import { Participant } from '~/models/participant'
import { Project } from '~/models/project'
import { DiagramTypeInfo } from '~/classes/diagram/DiagramTypeInfo'

const PARTICIPANT_OVERFLOW_LIMIT = 3

export default {
  layout: 'empty',
  data () {
    return {
      connected: this.$socket.connected,
      EntityType,
      EntityTypeInfo,
      editMenu: {
        show: false,
        entity: 0,
        props: ['title'],
        quickCreates: {},
        x: 0,
        y: 0
      },
      editDiagramMenu: {
        show: false,
        name: ''
      },
      showingInviteMenu: false
    }
  },
  head () {
    let title = 'Carregando diagrama...'
    if (this.diagram) {
      title = this.diagram.name
    }
    return {
      title
    }
  },
  computed: {
    ...mapState(['currentParticipant']),
    diagram () {
      return Diagram.find(this.$route.params.id)
    },
    project () {
      if (this.diagram == null) { return null }
      return Project.find(this.diagram.projectId)
    },
    selectedEntity () {
      const participant = Participant
        .query()
        .where('id', this.currentParticipant)
        .first()
      if (!participant) {
        return null
      }
      return Entity.find(participant.grabbedId)
    },
    participants () {
      return Participant
        .query()
        .where('diagramId', Number(this.$route.params.id))
        .limit(PARTICIPANT_OVERFLOW_LIMIT)
        .get()
    },
    otherParticipants () {
      return Participant
        .query()
        .where('diagramId', Number(this.$route.params.id))
        .offset(PARTICIPANT_OVERFLOW_LIMIT)
        .get()
    },
    entities () {
      return Entity
        .query()
        .where('diagramId', Number(this.$route.params.id))
        .get()
    },
    myParticipant () {
      return Participant.find(this.currentParticipant)
    },
    grabbedId () {
      if (!this.myParticipant) {
        return null
      }
      return this.myParticipant.grabbedId
    },
    entityTypes () {
      if (!this.diagram) { return [] }
      return DiagramTypeInfo[this.diagram.type].entityTypes
    }
  },
  watch: {
    selectedEntity (value) {
      if (value == null) {
        this.editMenu.show = false
      }
    },
    diagram (value) {
      this.editDiagramMenu.name = value.name
    }
  },
  beforeDestroy () {
    this.$socket.disconnect()
  },
  sockets: {
    disconnect () {
      this.connected = false
    },
    connect () {
      this.connected = true
    }
  },
  created () {
    Participant.create({ data: [] })
    Diagram
      .api()
      .get(`${Diagram.entity}/${this.$route.params.id}`)
      .then(({ response }) => {
        Project.insertOrUpdate({ data: response.data.project })
      })
  },
  mounted () {
    this.connect()
  },
  methods: {
    connect () {
      this.$socket.io.opts.extraHeaders.Authorization = this.$auth.strategy.token.get()
      this.$socket.connect()
      this.$socket.emit('join', this.$route.params.id)
    },
    createEntity (entityType, customProps) {
      this.$socket.emit('create', {
        type: entityType,
        diagramId: this.$route.params.id,
        height: EntityTypeInfo[entityType].height,
        width: EntityTypeInfo[entityType].width,
        ...customProps
      })

      // Open entity menu after creating an entity
      const hookId = Query.on('afterCreate', (data, x, entity) => {
        if (entity === 'entities') {
          const { top, left } = this.$refs.stage.$el.getBoundingClientRect()

          this.$socket.emit('grab', data.id)
          this.openEditMenu({
            id: data.id,
            x: left + 16,
            y: top + 16,
            props: EntityTypeInfo[data.type].props,
            quickCreates: EntityTypeInfo[data.type].quickCreates
          })

          Query.off(hookId)
        }
      })
    },
    openEditMenu ({ id, x, y, props, quickCreates = {} }) {
      this.editMenu.entity = id
      this.editMenu.props = props
      this.editMenu.quickCreates = quickCreates
      this.editMenu.x = x
      this.editMenu.y = y
      this.editMenu.show = true
    },
    submitEditDiagram () {
      Diagram.api()
        .put(`${Diagram.entity}/${this.$route.params.id}`, {
          name: this.editDiagramMenu.name
        })
        .then(() => {
          this.editDiagramMenu.show = false
        })
        .catch(() => {
          // TODO
        })
    }
  }
}
</script>

<style>
html {
  overflow: hidden;
}
</style>
