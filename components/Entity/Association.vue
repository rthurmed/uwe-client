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
          origin.x + (origin.width / 2),
          origin.y + (origin.height / 2),
          target.x + (target.width / 2),
          target.y + (target.height / 2),
        ],
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
      }"
    />
    <!-- TODO: Place between the target and origin -->
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
  </v-group>
</template>

<script>
import EntityMixin from '~/mixins/EntityMixin'

export default {
  mixins: [EntityMixin]
}
</script>
