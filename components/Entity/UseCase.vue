<template>
  <v-group
    :config="{
      id: entity.id,
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
import { mapState } from 'vuex'
import { Entity } from '~/models/entity'

export default {
  props: {
    entityId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['style']),
    entity () {
      return Entity.find(this.entityId)
    }
  }
}
</script>
