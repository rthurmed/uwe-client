<template>
  <v-group
    :config="{
      uid: entity.id,
      x: entity.x,
      y: entity.y,
      width: 160,
      height: 150,
      draggable: true
    }"
  >
    <!-- TODO: Replace with an svg image (using an "file" style) -->
    <v-rect
      :config="{
        width: 160,
        height: 150,
        fill: '#FFEC27',
        cornerRadius: 4,
        stroke: selected ? style.box.selectedStroke : style.box.stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        text: `Entidade #${entity.id} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum porta leo, eu condimentum orci mollis in. Vivamus dictum tempor hendrerit. Nulla et sapien at dolor fringilla feugiat. In mattis nulla a lectus porta fermentum.`,
        width: 160,
        height: 150,
        fontSize: style.text.size,
        padding: 8,
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
