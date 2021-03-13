<template>
  <router-view />
  <app-footer />
  <div class="placeholder mt-16" />
  <!-- <changelog /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Changelog from './components/Changelog.vue';
import AppFooter from '~/components/layout/AppFooter.vue';

export default defineComponent({
  name: 'App',

  components: {
    // Changelog,
    AppFooter,
  },

  setup() {
    return {};
  },
});
</script>
