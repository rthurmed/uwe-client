<template>
  <v-row>
    <v-col>
      <!--  -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  created () {
    this.$socket.io.opts.extraHeaders.Authorization = this.$auth.strategy.token.get()
    this.$socket.connect()
    this.$socket.emit('join', this.$route.params.id)
  }
}
</script>
