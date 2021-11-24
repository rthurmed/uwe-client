<template>
  <div class="fill-height">
    <v-btn fab small absolute style="left: -20px; top: 10px; z-index: 200;">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
      <v-toolbar flat style="overflow: auto; overflow-y: hidden;">
        <v-btn
          v-for="participant in participants"
          :key="participant.id"
          icon
          class="mr-1"
        >
          <v-avatar color="blue">
            <!-- TODO: Display user initials -->
            {{ participant.userId.substr(0, 2) }}
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <!-- OPTIONS TO ADD -->
      <v-system-bar color="transparent">
        Entidades
      </v-system-bar>
      <v-container fluid style="max-height: 200px; overflow-y: scroll">
        <v-row dense>
          <v-col v-for="i in 24" :key="i">
            <v-btn large block>
              <v-icon>
                mdi-earth
              </v-icon>
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
              v-for="i in 20"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon>mdi-earth</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Actor1
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <!-- RIGHT SIDE PANEL -->
    <v-navigation-drawer app right clipped>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-center text-h5">
              Actor1
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="prop in entityProps"
          :key="prop"
          @click="() => {}"
        >
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ prop }}
            </v-list-item-subtitle>
            <v-list-item-title>
              {{ prop }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
        <v-stage
          id="stage"
          ref="stage"
          class="fill-height"
          :config="stageConfig"
          @mousemove="handleMouseMove"
        >
          <v-layer>
            <!-- TODO: animate this -->
            <v-group
              v-for="participant in participants"
              :key="participant.id"
              :config="{
                x: participant.x,
                y: participant.y,
              }"
            >
              <v-rect
                :config="{
                  width: 100,
                  height: 100,
                }"
              />
              <v-text
                :config="{
                  text: participant.userId,
                }"
              />
            </v-group>
          </v-layer>
        </v-stage>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Diagram } from '~/models/diagram'
import { Participant } from '~/models/participant'

export default {
  beforeRouteLeave (to, from, next) {
    this.$socket.emit('leave')
    this.$socket.disconnect()
    next()
  },
  layout: 'empty',
  data () {
    return {
      connected: this.$socket.connected,
      stageConfig: {
        width: 600,
        height: 600,
        draggable: true
      },
      mouse: {
        x: 0,
        y: 0
      },
      updateRate: 300,
      mouseUpdateIntervalId: null,
      // Testing only
      entityProps: [
        'title',
        'x',
        'y',
        'height',
        'width'
      ]
    }
  },
  computed: {
    diagram () {
      return Diagram.find(this.$route.params.id)
    },
    participants () {
      return Participant.query().where('diagramId', this.$route.params.id).get()
    }
  },
  beforeDestroy () {
    clearInterval(this.mouseUpdateIntervalId)
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
    Diagram.api().get(`${Diagram.entity}/${this.$route.params.id}`)
    this.connect()
    this.mouseUpdateIntervalId = setInterval(() => {
      if (!this.connected) { return }
      this.$socket.emit('move', this.mouse)
    }, this.updateRate)
  },
  mounted () {
    const rect = this.$refs.stage.$el.getBoundingClientRect()
    this.stageConfig.height = rect.height
    this.stageConfig.width = rect.width
  },
  methods: {
    connect () {
      this.$socket.io.opts.extraHeaders.Authorization = this.$auth.strategy.token.get()
      this.$socket.connect()
      this.$socket.emit('join', this.$route.params.id)
    },
    handleMouseMove (e) {
      const stage = e.target.getStage()
      const { x: offsetX = 0, y: offsetY = 0 } = stage.attrs
      const { layerX, layerY } = e.evt
      this.mouse.x = layerX - offsetX
      this.mouse.y = layerY - offsetY
    }
  }
}
</script>
