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
        dash: [10, 5],
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <v-text
      :config="{
        x: (origin.x + target.x) / 2,
        y: (origin.y + target.y) / 2,
        text: `<<${kind}>>`,
        width: 100,
        fontSize: style.text.size,
        align: 'center'
      }"
    />
    <!-- Arrow head -->
    <!-- If is <<include>>, is flipped -->
    <v-line
      :config="{
        points: [
          16, 8,
          0, 0,
          16, -8,
        ],
        rotation: kind === 'include' ? angle + 180 : angle,
        x: kind === 'include' ? targetOffset.x : originOffset.x,
        y: kind === 'include' ? targetOffset.y : originOffset.y,
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
    kind: {
      type: String,
      default: () => 'extend' // or 'include'
    }
  }
}
</script>
