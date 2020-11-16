<template>
  <div class="auth-callback-error">
    <h1>OOPS!</h1>
    <h2>Authentifizierungsfehler</h2>
    <router-link :to="{ name: 'home' }">
      Zurück zur Startseite
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AuthCallbackError',
};
</script>

<style lang="scss" scoped>
.auth-callback-error {
  display: flex;
  margin: auto;
  flex-flow: column;
  align-items: center;

  h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
