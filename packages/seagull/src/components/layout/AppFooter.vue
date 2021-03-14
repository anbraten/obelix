<template>
  <div class="absolute bottom-0 w-full px-2 border-t-1 shadow-xl bg-white">
    <div class="flex mx-auto max-w-2xl justify-around">
      <router-link class="footer-btn" :to="{ name: 'bookings' }">
        <o-icon class="icon" pack="fas" icon="calendar" />
        <span class="text">Buchen</span>
      </router-link>
      <router-link class="footer-btn" :to="{ name: 'bookables' }">
        <o-icon pack="fas" icon="ship" />
        <span class="text">Boote</span>
      </router-link>
      <router-link v-if="isTrainer" class="footer-btn" :to="{ name: 'training' }">
        <o-icon pack="fas" icon="dumbbell" />
        <span class="text">Training</span>
      </router-link>
      <router-link v-if="isAdmin" class="footer-btn" :to="{ name: 'admin' }">
        <o-icon pack="fas" icon="cog" />
        <span class="text">Admin</span>
      </router-link>
      <router-link class="footer-btn" :to="{ name: 'settings' }">
        <img class="w-8 h-8" src="/src/assets/images/girl.png" />
      </router-link>
      <!-- Obelix - Made with &#10084; and Vue.js -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AppFooter',

  setup() {
    const isAdmin = ref(true);
    const isTrainer = ref(true);

    return {
      isAdmin,
      isTrainer,
    };
  },
});
</script>
