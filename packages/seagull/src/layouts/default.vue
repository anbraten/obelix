<template>
  <router-view />
  <AppFooter />
  <div class="placeholder mt-16" />
  <!-- <changelog /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import Changelog from './components/Changelog.vue';
import AppFooter from '~/layouts/default/AppFooter.vue';

export default defineComponent({
  name: 'Default',

  components: {
    // Changelog,
    AppFooter,
  },

  setup() {
    return {};
  },
});
</script>
