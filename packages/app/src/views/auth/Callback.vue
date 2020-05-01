<template>
    <div>
        <p>Sign-in in progress</p>
    </div>
</template>

<script>
import Store from '@/store';

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

    console.log('url', redirectUrl);

    if (redirectUrl) {
      this.$router.push({ path: redirectUrl });
      return;
    }

    this.$router.push({ name: 'home' });
  },
};
</script>
