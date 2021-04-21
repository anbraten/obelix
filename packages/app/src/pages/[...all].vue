<template>
  <div>
    <h1>OOPS!</h1>
    <h2>Seite nicht gefunden.</h2>
    <router-link :to="{ name: 'home' }">
      Zurück zur Startseite
    </router-link>
  </div>
</template>

<route lang="yaml">
name: not-found
</route>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>
