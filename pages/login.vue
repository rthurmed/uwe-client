<template>
  <article class="d-flex align-center justify-center flex-column" style="height: 70vh">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
      class="mb-2"
    />
    <span>
      Carregando...
    </span>
  </article>
</template>

<script>
export default {
  layout: 'empty',
  mounted () {
    if (!this.$auth.loggedIn && this.$route.query.state === undefined) {
      this.$auth.loginWith('keycloak')
    }
  }
}
</script>
