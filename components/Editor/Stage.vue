<template>
  <!-- TODO: Add a grid background -->
  <v-stage
    id="stage"
    ref="stage"
    class="fill-height"
    :config="stageConfig"
    @mousemove="handleMouseMove"
    @click="handleClick"
    @tap="handleClick"
    @dblclick="handleDoubleClick"
    @dbltap="handleDoubleClick"
    @dragmove="handleDragMove"
    @dragend="handleDragEnd"
    @wheel="handleMouseWheel"
  >
    <!-- LAYER 1: BACKGROUND -->
    <v-layer>
      <template v-for="entity in backgroundEntities">
        <EntitySwinlane
          v-if="entity.type === EntityType.A_SWINLANE"
          :key="entity.id"
          :entity-id="entity.id"
        />
      </template>
    </v-layer>
    <!-- LAYER 2: FOREGROUND -->
    <v-layer>
      <template v-for="entity in foregroundEntities">
        <!-- TODO: Improve loading of entity components -->
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
        <EntityGeneralization
          v-else-if="entity.type === EntityType.GENERALIZATION"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityLabelledLink
          v-else-if="entity.type === EntityType.EXTEND"
          :key="entity.id"
          :entity-id="entity.id"
          kind="extend"
        />
        <EntityLabelledLink
          v-else-if="entity.type === EntityType.INCLUDE"
          :key="entity.id"
          :entity-id="entity.id"
          kind="include"
        />
        <EntityStartNode
          v-else-if="entity.type === EntityType.A_START"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityEndNode
          v-else-if="entity.type === EntityType.A_END"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityEndFlowNode
          v-else-if="entity.type === EntityType.A_END_FLOW"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityAction
          v-else-if="entity.type === EntityType.A_ACTION"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityAssociation
          v-else-if="entity.type === EntityType.A_ASSOCIATION"
          :key="entity.id"
          :entity-id="entity.id"
          arrow
          with-title
        />
        <EntityFlowSplit
          v-else-if="entity.type === EntityType.A_BRANCH"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityFlowSplit
          v-else-if="entity.type === EntityType.A_MERGE"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityParallelNode
          v-else-if="entity.type === EntityType.A_FORK"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityParallelNode
          v-else-if="entity.type === EntityType.A_JOIN"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityObject
          v-else-if="entity.type === EntityType.A_OBJ"
          :key="entity.id"
          :entity-id="entity.id"
        />
        <EntityException
          v-else-if="entity.type === EntityType.A_EXCEPTION"
          :key="entity.id"
          :entity-id="entity.id"
        />
      </template>
    </v-layer>
    <!-- LAYER 3: DEBUG -->
    <v-layer v-if="debug">
      <!-- ROOT -->
      <v-circle
        :config="{
          x: 0,
          y: 0,
          radius: 4,
          stroke: 'blue'
        }"
      />
      <!-- ENTITIES -->
      <v-circle
        v-for="entity in entities"
        :key="entity.id"
        :config="{
          x: entity.x,
          y: entity.y,
          radius: 4,
          stroke: 'blue'
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
import { mapState } from 'vuex'
import { Entity } from '~/models/entity'
import { Participant } from '~/models/participant'
import { EntityType } from '~/models/enum/entity-type'
import { EntityTypeInfo } from '~/classes/entity/EntityTypeInfo'
import { download } from '~/util/file'
import { Diagram } from '~/models/diagram'
import { DiagramTypeInfo } from '~/classes/diagram/DiagramTypeInfo'

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
      updateRate: 1000,
      syncIntervalId: null,
      EntityType,
      EntityTypeInfo,
      debug: false
    }
  },
  computed: {
    ...mapState(['style']),
    diagram () {
      return Diagram.find(this.diagramId)
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
    backgroundEntities () {
      return this.entities.filter(e => EntityTypeInfo[e.type].background)
    },
    foregroundEntities () {
      return this.entities.filter(e => !EntityTypeInfo[e.type].background)
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
      this.resize()
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
    getIdFromEvent (e) {
      let id = null
      const { attrs, parent } = e.target
      if (attrs.uid) {
        id = attrs.uid
      }
      if (parent && parent.attrs.uid) {
        id = parent.attrs.uid
      }
      return id
    },
    handleMouseMove (e) {
      const stage = e.target.getStage()
      const { x: offsetX = 0, y: offsetY = 0 } = stage.attrs
      const { layerX, layerY } = e.evt
      this.mouse.x = layerX - offsetX
      this.mouse.y = layerY - offsetY
    },
    handleClick (e) {
      const id = this.getIdFromEvent(e)
      if (id != null) {
        this.$socket.emit('grab', id)
      } else {
        this.$socket.emit('drop')
      }
    },
    handleDoubleClick (e) {
      // FIXME: Replace this with second click on current entity
      const id = this.getIdFromEvent(e)
      if (id != null) {
        const entity = Entity.find(id)
        this.$emit('edit', {
          id,
          x: e.evt.pageX,
          y: e.evt.pageY,
          props: EntityTypeInfo[entity.type].props,
          quickCreates: EntityTypeInfo[entity.type].quickCreates
        })
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
    },
    exportAsImage () {
      const uri = this.$refs.stage
        .getNode()
        .toDataURL({
          mimeType: 'image/png',
          pixelRatio: 2
        })
      const filename = `${this.diagram.name} - Diagrama de ${DiagramTypeInfo[this.diagram.type].label}`
      download(uri, filename)
    }
  }
}
</script>
