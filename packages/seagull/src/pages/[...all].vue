<template>
  <div>
    Upps.
    <button @click="router.go(-1)">Back</button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NotFound',
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
});

</script>
