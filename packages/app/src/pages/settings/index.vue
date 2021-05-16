<template>
  <div class="flex flex-col items-center h-full">
    <div class="flex flex-col py-16 items-center justify-center w-full bg-gray-100">
      <span v-if="user" class="text-2xl">Moin {{ user.name }}!</span>
      <o-button class="mt-4" @click="doLogout">Abmelden</o-button>
    </div>

    <div class="flex flex-col text-center mt-16">
      <img src="/src/assets/images/logo.png" class="w-1/2 mx-auto" />
      <span class="text-3xl">Obelix</span>
      <span class="text-sm">Version 1.2.3</span>
      <span class="mt-6">Made with &#10084; by Anton Bracke</span>
    </div>
  </div>
</template>

<route lang="yaml">
name: settings
</route>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { logout, user } from '~/compositions/useAuthentication';

export default defineComponent({
  name: 'Settings',

  setup() {
    const router = useRouter();

    const doLogout = async () => {
      await logout();
      await router.replace({ name: 'auth-login' });
    };

    return {
      user,
      doLogout,
    };
  },
});
</script>
