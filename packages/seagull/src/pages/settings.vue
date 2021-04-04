<template>
  <div class="flex flex-col m-auto items-start">
    <div class="flex flex-col">
      <span class="text-3xl text-center">Obelix</span>
      <span class="text-sm text-center">Version 1.2.3</span>
      <img src="/src/assets/images/logo.png" class="w-1/2 mx-auto" />
    </div>

    <div class="flex flex-col items-center justify-center w-full mt-8">
      <span v-if="user">Angemeldet als: {{ user.name }}</span>
      <o-button class="mt-4" @click="doLogout">Abmelden</o-button>
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
