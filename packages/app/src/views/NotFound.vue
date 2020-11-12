<template>
  <div class="not-found">
    <h1>OOPS!</h1>
    <h2>Seite nicht gefunden.</h2>
    <router-link :to="{ name: 'home' }">
      Zurück zur Startseite
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="scss" scoped>
  .not-found {
    margin: auto;
    text-align: center;

    h1 {
      font-size: 5rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
</style>
