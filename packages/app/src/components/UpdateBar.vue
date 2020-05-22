<template>
  <div />
</template>

<script>
export default {
  name: 'UpdateBar',

  data() {
    return {
      refreshing: false,
      registration: null,
    };
  },

  created() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });

    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },

  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.$buefy.snackbar.open({
        message: 'Es steht ein neues Update bereit',
        type: 'is-success',
        position: 'is-bottom',
        actionText: 'Installieren',
        indefinite: true,
        onAction: () => {
          // Protect against missing registration.waiting.
          if (!this.registration || !this.registration.waiting) {
            return;
          }
          this.registration.waiting.postMessage('skipWaiting');
        },
      });
    },
  },
};
</script>
