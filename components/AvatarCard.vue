<template>
  <v-card
    elevation="0"
    class="px-4"
    v-on="$listeners"
  >
    <v-card-text class="d-flex justify-center">
      <v-avatar
        size="80"
        :class="`elevation-${ highlight ? 4 : 2 }`"
      >
        <slot />
      </v-avatar>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <span
        style="user-select: none;"
        :class="{
          'font-weight-bold': highlight
        }"
      >
        {{ title }}
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    highlight: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
