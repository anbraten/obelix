<template>
  <div />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthCallback',

  async created() {
    try {
      const redirectPath = await this.oidcSignInCallback();

      // if authentication was successful go to initially requested url
      this.$router.push(redirectPath);
      return;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // if authentication was not successful go to callback error page
      this.$router.push({ name: 'auth-callback-error' });
    }
  },

  methods: {
    ...mapActions('oidc', [
      'oidcSignInCallback',
    ]),
  },
};
</script>
