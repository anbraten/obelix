<template>
  <div>
    <button @click="startAuth">Login</button>
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
