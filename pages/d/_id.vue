<template>
  <div class="fill-height">
    <!-- CUSTOM APP BAR -->
    <!-- TODO: Implement diagram edit button -->
    <v-app-bar clipped-left clipped-right fixed app>
      <v-row>
        <v-col cols="2">
          <v-btn icon to="/">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
          <!-- INVITE USER FAB -->
          <v-btn fab small absolute style="left: 236px; top: 72px; z-index: 200;">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-btn large depressed>
            Projeto 1 > sistema
          </v-btn>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-btn icon to="/account">
            <v-avatar color="primary" />
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <!-- LEFT SIDE PANEL -->
    <v-navigation-drawer app clipped>
      <!-- AVATARS -->
      <!-- TODO: Display user initials -->
      <!-- TODO: Condense all other users after the 3rd one -->
      <v-toolbar flat style="overflow: auto; overflow-y: hidden;">
        <v-btn
          v-for="participant in participants"
          :key="participant.id"
          icon
          class="mr-1"
        >
          <v-avatar :color="$color(participant.id)">
            {{ participant.userId.substr(0, 2) }}
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <!-- DIAGRAM ESTRUCTURE -->
      <v-list subheader dense>
        <v-subheader>
          Estrutura do diagrama
        </v-subheader>
        <v-list-item class="pb-3">
          <!-- NEW ENTITY MENU -->
          <!-- TODO: Add nice icons -->
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
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
                v-for="type in EntityType"
                :key="type"
                large
                block
                @click="createEntity(type)"
              >
                <v-list-item-icon>
                  <v-icon>
                    mdi-earth
                  </v-icon>
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
            :key="key"
            :value="entity.id"
          >
            <v-list-item-icon>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-if="entity.title">
                {{ entity.title }}
              </v-list-item-title>
              <v-list-item-title>
                {{ EntityTypeInfo[entity.type].label }}
                #{{ entity.id }}
              </v-list-item-title>
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
          :diagram-id="$route.params.id"
          @edit="openEditMenu"
        />
        <EditorPropMenu
          :show.sync="editMenu.show"
          :entity="editMenu.entity"
          :prop="editMenu.prop"
          :x="editMenu.x"
          :y="editMenu.y"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Diagram } from '~/models/diagram'
import { Entity } from '~/models/entity'
import { EntityType, EntityTypeInfo } from '~/models/enum/entity-type'
import { Participant } from '~/models/participant'

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
        prop: 'title',
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    ...mapState(['currentParticipant']),
    diagram () {
      return Diagram.find(this.$route.params.id)
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
        .get()
    },
    entities () {
      return Entity
        .query()
        .where('diagramId', Number(this.$route.params.id))
        .get()
    },
    grabbedId () {
      const participant = Participant
        .query()
        .where('id', this.currentParticipant)
        .first()
      if (!participant) {
        return null
      }
      return participant.grabbedId
    }
  },
  watch: {
    selectedEntity (value) {
      if (value == null) {
        this.editMenu.show = false
      }
    }
  },
  beforeDestroy () {
    // FIXME: Isn't running if the page is reloaded
    this.$socket.emit('leave')
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
    Diagram.api().get(`${Diagram.entity}/${this.$route.params.id}`)
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
    createEntity (entityType) {
      this.$socket.emit('create', {
        type: entityType,
        diagramId: this.$route.params.id,
        height: 100,
        width: 100
      })
    },
    openEditMenu ({ id, x, y, prop }) {
      this.editMenu.entity = id
      this.editMenu.prop = prop
      this.editMenu.x = x
      this.editMenu.y = y
      this.editMenu.show = true
    }
  }
}
</script>
