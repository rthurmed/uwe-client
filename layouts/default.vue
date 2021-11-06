<template>
  <v-app>
    <v-app-bar color="transparent" fixed app>
      <v-row>
        <v-col cols="2">
          <!-- left side -->
          <!--  -->
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <!-- center -->
          <v-toolbar-title class="font-weight-bold">
            {{ title }}
          </v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <!-- right side -->
          <!-- TODO: Move the user avatar into other component -->
          <v-avatar color="primary" />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Editor Web de UML'
    }
  }
}
</script>
