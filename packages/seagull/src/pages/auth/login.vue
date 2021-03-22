<template>
  <div class="flex flex-col items-start m-auto">
    <img src="/src/assets/images/logo.png" />
    <o-button class="mt-4 mx-auto" @click="startAuth">Login</o-button>
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
