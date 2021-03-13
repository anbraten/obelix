<template>
  <div class="p-4">
    <o-input
      v-model="search"
      rounded
      placeholder="Suche ein Boot ..."
      icon="search"
    />

    <div class="mt-4">
      <card v-for="bookable in searchResult" :key="bookable._id" is-open :closeable="false" class="mb-2 rounded-2xl">
        <span>{{ bookable.name }}</span>

        <pre>{{ bookable }}</pre>
      </card>
    </div>
  </div>
</template>

<route lang="yaml">
name: bookables
</route>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Bookable from '~/types/bookable';

import Card from '~/components/Card.vue';

export default defineComponent({
  name: 'Bookables',

  components: {
    Card,
  },

  setup() {
    const bookables: Bookable[] = [
      {
        _id: 'bookable:1',
        name: 'Pegasus',
        category: 'category:1',
      },
      {
        _id: 'bookable:2',
        name: 'Obelix',
        category: 'category:1',
      },
      {
        _id: 'bookable:3',
        name: 'Herkules',
        category: 'category:1',
      },
      {
        _id: 'bookable:3',
        name: 'Teamwork',
        category: 'category:2',
      },
    ];

    const search = ref('');
    const searchResult = computed(
      () => {
        if (!search.value) {
          return bookables;
        }

        return bookables.filter(bookable => JSON.stringify(bookable).toLocaleLowerCase().includes(search.value));
      },
    );

    return {
      search,
      searchResult,
    };
  },
});
</script>
