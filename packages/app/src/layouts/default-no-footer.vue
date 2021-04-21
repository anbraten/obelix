<template>
  <router-view />
  <!-- <changelog /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import Changelog from './components/Changelog.vue';

export default defineComponent({
  name: 'DefaultNoFooter',

  components: {
    // Changelog,
  },

  setup() {
    return {};
  },
});
</script>
