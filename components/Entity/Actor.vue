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
    <v-line
      :config="{
        x: entity.width * 0.5,
        points: scalePoints({
          width: entity.width,
          height: entity.height,
          points: [
            0, 0,
            0, 65,
            25, 90,
            0, 65,
            -25, 90,
            0, 65,
            0, 45,
            40, 45,
            -40, 45,
          ]
        }),
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-circle
      :config="{
        x: entity.width * 0.5,
        y: Math.min(entity.width, entity.height) * 0.2,
        radius: Math.min(entity.width, entity.height) * 0.2,
        fill: style.box.fill,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        text: title,
        y: entity.height - 5,
        width: entity.width,
        fontSize: style.text.size,
        fontStyle: entity.abstract ? 'italic' : 'normal',
        align: 'center'
      }"
    />
    <!-- DEBUG -->
    <!-- <v-circle
      :config="{
        x: entity.width * 0.5,
        y: entity.height * 0.5,
        radius: 2,
        stroke: 'red'
      }"
    />
    <v-rect
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
