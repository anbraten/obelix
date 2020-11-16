<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer />
    <UpdateBar />
    <Changelog />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import UpdateBar from '@/components/UpdateBar.vue';
import Changelog from '@/components/Changelog.vue';

export default {
  name: 'App',

  components: {
    NavBar,
    Footer,
    UpdateBar,
    Changelog,
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

html,
body,
#app {
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  display: flex;
  flex-flow: column;
  font-family: Arial, Helvetica, sans-serif;
  color: #2c3e50;
}
</style>
