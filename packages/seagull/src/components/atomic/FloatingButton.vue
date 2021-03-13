<template>
  <div class="flex items-center justify-center w-16 h-16 text-white text-4xl rounded-full shadow p-2 cursor-pointer bg-primary">
    <o-icon pack="fas" :icon="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FloatingButton',

  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  setup(props) {
  },
});
</script>
