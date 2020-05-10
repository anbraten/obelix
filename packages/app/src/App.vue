<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer />
    <UpdateBar />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import UpdateBar from '@/components/UpdateBar.vue';

import Api from '@/libs/api';

export default {
  name: 'App',

  components: {
    NavBar,
    Footer,
    UpdateBar,
  },

  computed: {
    ...mapState([
      'isConnected',
    ]),
    ...mapState('auth', [
      'user',
    ]),
  },

  watch: {
    user(user) {
      if (user) {
        Api.open();
      }
    },
  },
};
</script>

<style lang="scss">
@import '~reset-css';

// import fontawesome
$fa-font-path: '~@fortawesome/fontawesome-free/webfonts';
@import '~@fortawesome/fontawesome-free/scss/fontawesome';
@import '~@fortawesome/fontawesome-free/scss/regular';
@import '~@fortawesome/fontawesome-free/scss/solid';

* {
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-flow: column;
  font-family: sans-serif; // TODO: add proper font
  color: #2c3e50;
}
</style>
