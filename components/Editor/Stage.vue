<template>
  <v-stage
    id="stage"
    ref="stage"
    class="fill-height"
    :config="stageConfig"
    @mousemove="handleMouseMove"
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
  created () {
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
