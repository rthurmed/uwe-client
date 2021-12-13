<template>
  <v-group
    v-if="target && origin"
    :config="{
      uid: entity.id
    }"
  >
    <v-line
      :config="{
        points: [
          originOffset.x,
          originOffset.y,
          targetOffset.x,
          targetOffset.y,
        ],
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-line
      v-if="arrow"
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
  props: {
    arrow: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
