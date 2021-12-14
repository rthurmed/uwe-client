<template>
  <v-group
    :config="{
      uid: entity.id,
      x: entity.x,
      y: entity.y,
      width: entity.width,
      height: entity.height,
      draggable: grabbed
    }"
  >
    <v-rect
      :config="{
        width: entity.width,
        height: entity.height,
        fill: style.stroke,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <!-- ARROW -->
    <template v-if="origin && target">
      <v-line
        :config="{
          points: [
            originOffset.x - entity.x,
            originOffset.y - entity.y,
            targetOffset.x - entity.x,
            targetOffset.y - entity.y,
          ],
          stroke: stroke,
          strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
        }"
      />
      <v-line
        :config="{
          points: [
            16, 8,
            0, 0,
            16, -8,
          ],
          x: targetOffset.x - entity.x,
          y: targetOffset.y - entity.y,
          rotation: angle + 180,
          stroke: stroke,
          strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
        }"
      />
    </template>
    <!-- DEBUG -->
    <!-- <v-rect
      :config="{
        width: entity.width,
        height: entity.height,
        stroke: 'red',
        strokeWidth: 1
      }"
    /> -->
  </v-group>
</template>

<script>
import EntityMixin from '~/mixins/EntityMixin'

export default {
  mixins: [EntityMixin]
}
</script>
