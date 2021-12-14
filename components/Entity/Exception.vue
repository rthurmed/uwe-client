<template>
  <v-group
    v-if="target && origin"
    :config="{
      uid: entity.id
    }"
  >
    <v-line
      :config="{
        x: originOffset.x,
        y: originOffset.y,
        rotation: angle - 90,
        points: scalePoints({
          width: defaultWidth,
          height: offsetDistance,
          points: [
            0, 0,
            50, 60,
            -50, 40,
            0, 100,
          ]
        }),
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <!-- Arrow -->
    <v-line
      :config="{
        points: [
          16, 8,
          0, 0,
          16, -8,
        ],
        rotation: angle + 180,
        x: targetOffset.x,
        y: targetOffset.y,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        x: (originOffset.x + targetOffset.x) / 2,
        y: (originOffset.y + targetOffset.y) / 2,
        text: entity.title,
        width: 100,
        fontSize: style.text.size,
        align: 'center'
      }"
    />
    <!-- DEBUG -->
    <!-- <v-circle
      :config="{
        x: originOffset.x,
        y: originOffset.y,
        radius: 2,
        stroke: 'red'
      }"
    />
    <v-circle
      :config="{
        x: targetOffset.x,
        y: targetOffset.y,
        radius: 2,
        stroke: 'red'
      }"
    /> -->
  </v-group>
</template>

<script>
import EntityMixin from '~/mixins/EntityMixin'

export default {
  mixins: [EntityMixin],
  data () {
    return {
      defaultWidth: 60
    }
  }
}
</script>
