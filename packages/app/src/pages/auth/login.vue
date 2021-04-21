<template>
  <div class="flex flex-col items-start m-auto items-center">
    <span class="text-5xl text-center">Obelix</span>
    <span class="text-xl text-center">Na brauchst n` Boot?</span>

    <img src="/src/assets/images/logo.png" class="w-1/2 mt-8" />
    <o-button class="mt-8" @click="startAuth">Login</o-button>
  </div>
</template>

<route lang="yaml">
name: auth-login
meta:
  layout: auth
  authentication: guests-only
</route>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',

  setup() {
    const BACKEND_URL = 'http://localhost:4000';
    const startAuth = () => {
      // location.href = `${BACKEND_URL}/oauth/keycloak?redirect=auth/callback`;
      location.href = `${BACKEND_URL}/oauth/keycloak`;
    };

    return {
      startAuth,
    };
  },
});
</script>
