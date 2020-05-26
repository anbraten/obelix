<template>
  <div class="about">
    <h1 class="title">{{ title }}</h1>
    <img src="/img/icons/icon.png" />
    <p>Version: {{ version }}</p>
    <br />
    <div class="button tester" @click="setTester">{{ isTester ? 'Testmodus verlassen.' : 'Tester werden.' }}</div>
    <br />
    <div class="button reset" @click="resetApp">App zurücksetzen!</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import config from '@/libs/config';

export default {
  name: 'About',
  data: () => ({
    title: config('title', 'Obelix'),
    version: process.env.VUE_APP_VERSION,
  }),
  computed: {
    ...mapState([
      'isTester',
    ]),
  },
  methods: {
    setTester() {
      this.$store.commit('setTester', !this.isTester);
    },
    async resetApp() {
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (!confirm('Möchtest du wirklich fortfahren?')) {
        return;
      }

      // empty caches
      await Promise.all((await caches.keys()).map((cacheName) => caches.delete(cacheName)));

      // unregister service-worker
      await Promise.all((await navigator.serviceWorker.getRegistrations()).map((registraion) => registraion.unregister()));

      // clear localstorage
      localStorage.clear();

      // clear sessionstorage
      sessionStorage.clear();

      // reload page from server
      window.location.reload(true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .about {
    margin: auto;
    text-align: center;
  }

  .title {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  .button {
    &.tester {
      margin-bottom: 1rem;
    }
  }
</style>
