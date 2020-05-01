<template>
  <div>
    <div class="button" @click="login">Login</div>
  </div>
</template>

<script>
import Store from '@/store';

export default {
  name: 'AuthLogin',

  async created() {
    if (Store.getters['auth/isAuthenticated']) {
      this.$router.push({ name: 'home' });
    }
  },

  methods: {
    async login() {
      await Store.dispatch('auth/authenticate');
    },
  },
};
</script>
