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
    <v-circle
      :config="{
        x: radius,
        y: radius,
        radius: radius,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-line
      :config="{
        x: radius,
        y: radius,
        rotation: 45,
        points: [
          0, radius,
          0, -radius,
          0, 0,
          radius, 0,
          -radius, 0
        ],
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
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
