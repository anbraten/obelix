<template>
  <div />
</template>

<route lang="yaml">
name: home
</route>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',

  setup() {
    const router = useRouter();

    onMounted(async () => {
      await router.replace({ name: 'bookings' });
    });

    return {};
  },
});
</script>
