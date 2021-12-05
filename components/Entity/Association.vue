<template>
  <v-group
    :config="{
      uid: entity.id
    }"
  >
    <v-line
      v-if="target && origin"
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
    <v-text
      :config="{
        x: (origin.x + target.x) / 2,
        y: (origin.y + target.y) / 2,
        text: entity.title ? entity.title : `Association #${entity.id}`,
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
  mixins: [EntityMixin]
}
</script>
