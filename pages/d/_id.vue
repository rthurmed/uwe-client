<template>
  <div class="fill-height">
    <v-btn fab small absolute style="left: -20px; top: 10px; z-index: 200;">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
          <v-avatar color="blue">
            {{ participant.userId.substr(0, 2) }}
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <!-- OPTIONS TO ADD -->
      <!-- TODO: Add nice icons -->
      <v-system-bar color="transparent">
        Entidades
      </v-system-bar>
      <v-container fluid style="max-height: 200px; overflow-y: scroll">
        <v-row dense>
          <v-col
            v-for="type in EntityType"
            :key="type"
            cols="12"
          >
            <v-btn
              large
              block
              @click="createEntity(type)"
            >
              <v-icon left>
                mdi-earth
              </v-icon>
              {{ EntityTypeInfo[type].label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <!-- DIAGRAM ESTRUCTURE -->
      <v-system-bar color="transparent">
        Estrutura do diagrama
      </v-system-bar>
      <v-card flat style="max-height: calc(100vh - 384px); overflow-y: scroll">
        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="entity in entities"
              :key="entity.id"
            >
              <v-list-item-icon>
                <v-icon>mdi-earth</v-icon>
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
      </v-card>
    </v-navigation-drawer>
    <!-- RIGHT SIDE PANEL -->
    <v-navigation-drawer app right clipped>
      <EditorInspectPanel />
    </v-navigation-drawer>
    <!-- MAIN CONTENT -->
    <v-row>
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
        <EditorStage :diagram-id="$route.params.id" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
      EntityTypeInfo
    }
  },
  computed: {
    diagram () {
      return Diagram.find(this.$route.params.id)
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
    }
  },
  beforeDestroy () {
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
        diagramId: this.$route.params.id
      })
    }
  }
}
</script>
