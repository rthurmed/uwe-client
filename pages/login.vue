<template>
  <article>
    loading...
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
