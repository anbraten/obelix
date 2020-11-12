<template>
  <div class="page">
    <div class="head">
      <div class="button" @click="$router.go(-1)">
        <i class="fas fa-angle-double-left" />
      </div>
      <div class="head-title">
        Benutzer verwalten
      </div>
      <div />
    </div>

    <template v-if="users">
      <div v-for="user in users" :key="user.id" class="user" @click="selectedUser = user">
        <span class="name"><b-icon pack="fas" icon="user" size="is-small" /> {{ user.name }}</span>
        <span class="group">{{ user.group || 'Standard' }}</span>
      </div>
    </template>

    <b-modal
      :active.sync="isModalOpen"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <UserForm v-if="selectedUser" :user="selectedUser" @group="changeGroup" @access="changeAccess" />
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import UserForm from '@/components/UserForm.vue';

export default {
  name: 'AdminUsers',

  components: {
    UserForm,
  },

  data() {
    return {
      selectedUser: null,
    };
  },

  computed: {
    ...mapState('rental', [
      'users',
    ]),
    isModalOpen: {
      get() {
        return !!this.selectedUser;
      },
      set(active) {
        if (!active) {
          this.selectedUser = null;
        }
      },
    },
  },

  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.$store.dispatch('rental/getUsers');
    },
    changeGroup(group) {
      if (!this.selectedUser) {
        return;
      }

      this.$set(this.selectedUser, 'group', group);

      this.$store.dispatch('rental/updateUser', this.selectedUser);
    },
    changeAccess(access) {
      if (!this.selectedUser) {
        return;
      }

      this.$set(this.selectedUser, 'access', access);

      this.$store.dispatch('rental/updateUser', this.selectedUser);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 .5rem;

    .head-title {
      font-size: 1.5rem;
    }
  }
}

.user {
  display: flex;
  flex-wrap: wrap !important;
  padding: 0.5rem 1rem;
  flex-flow: row;
  max-width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100,121,143,0.122);
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    z-index: 1;
  }

  .group {
    margin-left: auto;
  }
}
</style>
