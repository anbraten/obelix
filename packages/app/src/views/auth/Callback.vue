<template>
  <b-loading :is-full-page="true" :active="true" :can-cancel="false" />
</template>

<script>
import Store from '@/store';
import Debug from '@/libs/debug';

const debug = Debug('AuthCallback');

export default {
  name: 'AuthCallback',

  async created() {
    if (Store.getters['auth/isAuthenticated']) {
      this.$router.push({ name: 'home' });
      return;
    }

    try {
      await Store.dispatch('auth/singInCallback');
    } catch (e) {
      this.$router.push({ name: 'Unauthorized' });
      return;
    }

    const { redirectUrl } = Store.state.auth;

    debug(redirectUrl);

    if (redirectUrl) {
      this.$router.push({ path: redirectUrl });
      return;
    }

    this.$router.push({ name: 'home' });
  },
};
</script>
