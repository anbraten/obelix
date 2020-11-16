<template>
  <b-modal
    :active.sync="visible"
    has-modal-card
    trap-focus
    :destroy-on-hide="true"
    aria-role="dialog"
    aria-modal
  >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Neue Funktionen
        </p>
      </header>
      <section class="modal-card-body">
        <div v-for="change in changes" :key="change.timestamp" class="change-block">
          <p class="change-title">
            {{ change.timestamp }}
          </p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="change-content" v-html="change.content" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="button" @click="setVersion">
          Okay
          <i class="fas fa-rocket icon" />
        </div>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';
import changelog from '@/changelog.json';

export default {
  name: 'Changelog',

  computed: {
    ...mapState(['version']),
    changes() {
      return changelog.changes;
    },
    visible: {
      get() {
        return this.version !== this.changes[0].timestamp;
      },
      set() {
        this.setVersion();
      },
    },
  },

  methods: {
    setVersion() {
      this.$store.commit('setVersion', this.changes[0].timestamp);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal .animation-content {
  .modal-card {
    width: calc(100% - 2rem);
    margin: 1rem;
    max-height: 30rem;

    &-title {
      text-align: center;
    }

    &-body {
      .change-block:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .change-title {
        position: relative;
        font-size: 1.2rem;
        margin-bottom: 1rem;

        &::after {
          content: " ";
          position: absolute;
          background: #dbdbdb;
          left: 0;
          bottom: -.5rem;
          width: 100%;
          height: 1px;
        }
      }

      .change-content {
        line-height: 1.5rem;
      }

      ::v-deep b {
        font-weight: bold;
      }
    }

    &-foot {
      justify-content: center;

      .button {
        background-color: #363636;
        border-color: #363636;
        color: #fff;
      }

      .icon {
        margin-left: .2rem !important;
      }
    }
  }
}
</style>
