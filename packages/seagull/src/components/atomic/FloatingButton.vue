<template>
  <div class="flex items-center justify-center w-14 h-14 text-white text-4xl rounded-full shadow-xl p-2 cursor-pointer bg-primary">
    <o-icon pack="fas" :icon="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FloatingButton',

  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>
