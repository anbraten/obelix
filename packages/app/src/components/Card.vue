<template>
  <div
    class="relative border-gray-300 bg-white border rounded-t-xl shadow p-4 pb-6 overflow-hidden text-white cursor-pointer"
    :class="{ 'shadow-xl': isOpen }"
  >
    <img class="absolute top-0 left-0 object-cover min-w-full h-full" :src="background" />
    <div class="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-90" />
    <div v-if="$slots.header" class="relative">
      <slot name="header" class="relative" />
    </div>
    <div v-if="isOpen" class="relative text-white" :class="{ 'mt-4': $slots.header }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',

  props: {
    background: {
      type: String,
      default: '/src/assets/images/card-bg.jpg',
    },

    isOpen: {
      type: Boolean,
      required: false,
    },

    closeable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>
