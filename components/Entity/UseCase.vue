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
    <v-ellipse
      :config="{
        width: entity.width,
        height: entity.height,
        x: entity.width * 0.5,
        y: entity.height * 0.46,
        fill: style.box.fill,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        width: entity.width,
        height: entity.height,
        text: entity.title ? entity.title : `Caso de Uso #${entity.id}`,
        fontSize: style.text.size,
        align: 'center',
        verticalAlign: 'middle'
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
