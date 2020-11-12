<template>
  <div v-if="isConnected">
    <router-view />
  </div>
  <b-loading v-else :active="true" />
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OnlineWrapper',

  computed: {
    ...mapState([
      'isConnected',
    ]),
  },
};
</script>
