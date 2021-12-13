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
        fill: style.box.stroke,
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
