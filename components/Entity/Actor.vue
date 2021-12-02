<template>
  <v-group
    :config="{
      uid: entity.id,
      x: entity.x,
      y: entity.y,
      width: 100,
      height: 100,
      draggable: grabbed
    }"
  >
    <!-- TODO: Replace with an svg image -->
    <v-line
      :config="{
        x: 50,
        points: [
          0, 0,
          0, 70,
          30, 110,
          0, 70,
          -30, 110,
          0, 70,
          0, 40,
          40, 40,
          -40, 40,
        ],
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-circle
      :config="{
        x: 50,
        radius: 24,
        fill: style.box.fill,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        text: entity.title ? entity.title : `Ator #${entity.id}`,
        y: 120,
        width: 100,
        fontSize: style.text.size,
        align: 'center'
      }"
    />
  </v-group>
</template>

<script>
import EntityMixin from '~/mixins/EntityMixin'

export default {
  mixins: [EntityMixin]
}
</script>
