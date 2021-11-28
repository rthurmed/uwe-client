<template>
  <v-group
    :config="{
      uid: entity.id,
      x: entity.x,
      y: entity.y,
      width: 100,
      height: 100,
      draggable: true
    }"
  >
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
        stroke: selected ? style.box.selectedStroke : style.box.stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-circle
      :config="{
        x: 50,
        radius: 24,
        fill: style.box.fill,
        stroke: selected ? style.box.selectedStroke : style.box.stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        text: `Entidade #${entity.id}`,
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
