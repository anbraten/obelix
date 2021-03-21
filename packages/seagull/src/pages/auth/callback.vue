<template>
  <div>
    Welcome back!
  </div>
</template>

<route lang="yaml">
name: auth-login
meta:
  layout: auth
  authentication: guests-only
</route>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Callback',

  setup() {
    const router = useRouter();

    onMounted(() => {
      void router.push({ name: 'home' });
    });
  },
});
</script>
