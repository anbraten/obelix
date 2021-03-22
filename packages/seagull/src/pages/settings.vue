<template>
  <div class="flex flex-col m-auto">
    <span v-if="user">Hallo {{ user.name }}!</span>
    <o-button class="mt-4" @click="doLogout">Abmelden</o-button>
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
