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
    <!-- ARROW -->
    <template v-if="origin && target">
      <v-line
        :config="{
          points: [
            originOffset.x - entity.x,
            originOffset.y - entity.y,
            targetOffset.x - entity.x,
            targetOffset.y - entity.y,
          ],
          stroke: stroke,
          strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
        }"
      />
      <v-line
        :config="{
          points: [
            16, 8,
            0, 0,
            16, -8,
          ],
          x: targetOffset.x - entity.x,
          y: targetOffset.y - entity.y,
          rotation: angle + 180,
          stroke: stroke,
          strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth
        }"
      />
    </template>
    <!-- POLYGON -->
    <v-line
      :config="{
        points: [
          entity.width / 2, 0,
          entity.width, entity.height / 2,
          entity.width / 2, entity.height,
          0, entity.height / 2
        ],
        fill: style.box.fill,
        stroke: stroke,
        strokeWidth: selected ? style.box.selectedStrokeWidth : style.box.strokeWidth,
        closed: true
      }"
    />
    <!-- LABEL -->
    <v-text
      :config="{
        text: entity.title,
        width: entity.width,
        height: entity.height,
        fontSize: style.text.size,
        align: 'center',
        verticalAlign: 'middle',
        ellipsis: true
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
