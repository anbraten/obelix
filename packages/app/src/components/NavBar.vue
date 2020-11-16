<template>
  <div class="top">
    <div class="nav">
      <div class="inner">
        <div class="nav-brand" @click="toHome">
          <img class="nav-icon" src="/img/icons/icon.png">
          <span class="nav-title">{{ title }}</span>
        </div>
        <div class="stretch" />
        <span v-if="userFullName">{{ userFullName }}</span>
        <div class="logout" @click="logout">
          <b-icon pack="fas" icon="sign-out-alt" size="is-small" />
        </div>
        <div v-if="isAdmin" class="admin" @click="$router.push({ name: 'admin' })">
          <b-icon pack="fas" icon="cog" size="is-small" />
        </div>
        <span v-if="!isConnected" class="offline"><i class="fas fa-signal" /></span>
      </div>
    </div>
    <div class="placeholder" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import auth from '@/libs/auth';
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
      userFullName: 'auth/userFullName',
      isAdmin: 'rental/isAdmin',
    }),
  },

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
    },
    toHome() {
      this.$router.push({ name: 'home' }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  display: flex;
  width: 100%;
  padding: .75rem 0;
  box-shadow: 0 1px 8px -1px rgba(0, 0, 0, .5);
  z-index: 10;
  background: rgba(34, 34, 40, .94);
  color: #fff;

  .inner {
    position: relative;
    display: flex;
    align-items: center;
    flex-flow: row;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    padding: 0 .5rem;
  }

  &-brand {
    cursor: pointer;
    position: relative;
    padding-left: 2.5rem;
  }

  &-icon {
    position: absolute;
    top: 50%;
    left: 0;
    width: 2rem;
    transform: translateY(-50%);
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

.nav-title,
span {
  text-decoration: none;
  font-size: 1.1rem;
}

.stretch {
  margin-left: auto;
}

.admin {
  margin-left: 1rem;
  cursor: pointer;
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
