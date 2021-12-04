<template>
  <!-- TODO: Add a grid background -->
  <v-stage
    ref="stage"
    class="fill-height"
    :config="stageConfig"
    @mousemove="handleMouseMove"
    @click="handleClick"
    @dragmove="handleDragMove"
    @dragend="handleDragEnd"
    @wheel="handleMouseWheel"
  >
    <!-- LAYER 1: RELATIONS -->
    <!-- TODO -->
    <!-- LAYER 2: ENTITIES -->
    <v-layer>
      <template v-for="entity in entities">
        <EntityUseCase
          v-if="entity.type === EntityType.USECASE"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityActor
          v-else-if="entity.type === EntityType.ACTOR"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityNote
          v-else-if="entity.type === EntityType.NOTE"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityAssociation
          v-else-if="entity.type === EntityType.ASSOCIATION"
          :key="entity.id"
          :entity-id="entity.id"
        />
      </template>
    </v-layer>
    <!-- LAYER 3: CURSORS -->
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
      currentEntity: {
        id: null,
        x: 0,
        y: 0
      },
      updateRate: 300,
      syncIntervalId: null,
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
    clearInterval(this.syncIntervalId)
  },
  mounted () {
    this.resize()
    // Starts sending mouse movement
    this.syncIntervalId = setInterval(this.sync, this.updateRate)
  },
  methods: {
    sync () {
      if (this.$socket.disconnected) {
        return
      }
      this.commitEntityMovement()
      this.resize()
      // FIXME: Temporarily disabled mouse move
      // this.$socket.emit('move', this.mouse)
    },
    commitEntityMovement () {
      if (this.currentEntity.id == null) {
        return
      }
      const entity = { ...Entity.find(this.currentEntity.id) }
      entity.x = parseInt(this.currentEntity.x)
      entity.y = parseInt(this.currentEntity.y)
      this.$socket.emit('patch', entity)
    },
    resize () {
      // Resize canvas
      const rect = this.$refs.stage.$el.getBoundingClientRect()
      this.stageConfig.height = rect.height
      this.stageConfig.width = rect.width
    },
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
    },
    handleDragMove (e) {
      const { uid, x, y } = e.target.attrs
      this.currentEntity.id = uid
      this.currentEntity.x = x
      this.currentEntity.y = y
    },
    handleDragEnd (e) {
      this.commitEntityMovement()
      this.currentEntity.id = null
    },
    handleMouseWheel (e) {
      // Based on: https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html

      // Applies zoom as the user scrolls

      const scaleBy = 1.1
      const stage = this.$refs.stage.getNode()
      const oldScale = stage.scaleX()
      const pointer = stage.getPointerPosition()

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
      }

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? -1 : 1

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction
      }

      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

      stage.scale({ x: newScale, y: newScale })

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      }

      stage.position(newPos)
    }
  }
}
</script>
