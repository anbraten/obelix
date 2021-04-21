<template>
  <div class="flex flex-col m-auto">
    <span v-if="user" class="text-center text-2xl">Moin {{ user.name }}!</span>
    <div class="mt-8 flex flex-col text-center">
      <img src="/src/assets/images/weather.png" />
    </div>
  </div>
</template>

<route lang="yaml">
name: home
</route>

<script lang="ts">
import { defineComponent } from 'vue';

import { user } from '~/compositions/useAuthentication';

export default defineComponent({
  name: 'Home',

  setup() {
    return {
      user,
    };
  },
});
</script>
