<template>
  <v-group
    :config="{
      uid: entity.id,
      x: entity.x,
      y: entity.y,
      draggable: true
    }"
  >
    <v-ellipse
      :config="{
        width: 160,
        height: 70,
        fill: style.box.fill,
        cornerRadius: style.box.radius,
        stroke: selected ? style.box.selectedStroke : style.box.stroke,
        strokeWidth: style.line.strokeWidth,
        shadowBlur: style.box.shadow
      }"
    />
    <v-text
      :config="{
        text: entity.title,
        y: style.box.padding,
        width: 100,
        fill: style.text.color,
        fontSize: style.text.size,
        fontStyle: 'bold',
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
