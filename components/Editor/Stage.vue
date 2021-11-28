<template>
  <!-- TODO: Add a grid background -->
  <v-stage
    ref="stage"
    class="fill-height"
    :config="stageConfig"
    @mousemove="handleMouseMove"
    @click="handleClick"
  >
    <!-- LAYER 1: ENTITIES -->
    <v-layer>
      <template
        v-for="entity in entities"
      >
        <EntityUseCase
          v-if="entity.type === EntityType.USECASE"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityActor
          v-if="entity.type === EntityType.ACTOR"
          :key="entity.id"
          :entity-id="entity.id"
        />
      </template>
    </v-layer>
    <!-- LAYER 1: CURSORS -->
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
        <v-text
          :config="{
            text: participant.userId,
          }"
        />
      </v-group>
    </v-layer>
  </v-stage>
</template>

<script>
import { mapState } from 'vuex'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'
import { EntityType, EntityTypeInfo } from '~/models/enum/entity-type'

export default {
  props: {
    diagramId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
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
      EntityType,
      EntityTypeInfo
    }
  },
  computed: {
    ...mapState(['style']),
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
    clearInterval(this.mouseUpdateIntervalId)
  },
  mounted () {
    // Resize canvas
    const rect = this.$refs.stage.$el.getBoundingClientRect()
    this.stageConfig.height = rect.height
    this.stageConfig.width = rect.width

    // Starts sending mouse movement
    this.mouseUpdateIntervalId = setInterval(() => {
      if (this.$socket.connected) {
        this.$socket.emit('move', this.mouse)
      }
    }, this.updateRate)
  },
  methods: {
    handleMouseMove (e) {
      const stage = e.target.getStage()
      const { x: offsetX = 0, y: offsetY = 0 } = stage.attrs
      const { layerX, layerY } = e.evt
      this.mouse.x = layerX - offsetX
      this.mouse.y = layerY - offsetY
    },
    handleClick (e) {
      // Select clicked entity
      let id = null
      const clicked = e.target
      if (clicked.attrs.uid) {
        id = clicked.attrs.uid
      }
      if (clicked.parent && clicked.parent.attrs.uid) {
        id = clicked.parent.attrs.uid
      }

      if (id != null) {
        this.$socket.emit('grab', id)
      } else {
        this.$socket.emit('drop')
      }
    }
  }
}
</script>
