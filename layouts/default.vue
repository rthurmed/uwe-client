<template>
  <v-app>
    <v-app-bar fixed app>
      <v-row>
        <v-col cols="2">
          <!-- left side -->
          <v-btn v-if="$route.name !== 'index'" icon to="/">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <!-- center -->
          <v-toolbar-title class="font-weight-bold">
            {{ title }}
          </v-toolbar-title>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <!-- right side -->
          <v-btn icon to="/account">
            <v-avatar color="primary" />
          </v-btn>
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
