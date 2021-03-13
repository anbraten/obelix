<template>
  <div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">intro.desc</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="intro.whats-your-name"
      aria-label="intro.whats-your-name"
      type="text"
      autocomplete="false"
      class="px-4 py-2 text-sm text-center bg-transparent border border-gray-200 rounded outline-none active:outline-none dark:border-gray-700"
      style="width: 250px"
    >
    <label class="hidden" for="input">intro.whats-your-name</label>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="router.push('/zug')"
      >
        Go
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GroupDropdown',
  setup() {
    const name = ref('');
    const router = useRouter();

    return {
      name,
      router,
    };
  },
});

</script>
