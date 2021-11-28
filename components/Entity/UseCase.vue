<template>
  <v-group
    :config="{
      uid: entity.id,
      x: entity.x,
      y: entity.y,
      width: 160,
      height: 70,
      draggable: true
    }"
  >
    <v-ellipse
      :config="{
        width: 160,
        height: 70,
        x: 80,
        y: 32,
        fill: style.box.fill,
        stroke: selected ? style.box.selectedStroke : style.box.stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        width: 160,
        height: 70,
        text: `Entidade #${entity.id}`,
        fontSize: style.text.size,
        align: 'center',
        verticalAlign: 'middle'
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
