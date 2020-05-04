<template>
  <div class="top">
    <div class="nav">
      <div class="inner">
        <router-link :to="{ name: 'home' }" class="nav-title">{{ title }}</router-link>
        <div class="stretch" />
        <template v-if="isAuthenticated">
          <span>{{ userFullName }}</span>
          <div class="logout" @click="logout"><i class="fas fa-sign-out-alt" /></div>
        </template>
        <span v-if="!isConnected" class="offline"><i class="fas fa-signal"/></span>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import config from '@/libs/config';

export default {
  name: 'NavBar',

  data: () => ({
    title: config('title', 'Obelix'),
  }),

  computed: {
    ...mapState([
      'isConnected',
    ]),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      userFullName: 'auth/userFullName',
    }),
  },

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  display: flex;
  width: 100%;
  padding: 0.75rem 0;
  box-shadow: 0 1px 8px -1px rgba(0, 0, 0, .5);
  z-index: 1000;
  background: #fff;

  .inner {
    position: relative;
    display: flex;
    align-items: center;
    flex-flow: row;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    padding: 0 0.5rem;
  }
}

.top {
  position: relative;
}

.placeholder {
  display: block;
  height: calc(2rem + (1rem + 1px)); // padding + text size
}

.right {
  margin-left: auto;
}

.nav-title, span {
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
}

.stretch {
  margin-left: auto;
}

.offline {
  i {
    position: relative;
    margin-left: 1rem;

    &::after {
      position: absolute;
      top: 60%;
      left: 60%;
      width: 120%;
      height: .2rem;
      background: red;
      transform: translate(-50%, -50%) rotate(45deg);
      content: '';
    }
  }
}

.logout {
  margin-left: 1rem;
  cursor: pointer;
}
</style>
