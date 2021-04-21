<template>
  <div class="flex flex-col p-4 overflow-y-auto items-center">
    <div class="max-w-2xl w-full">
      <o-input v-model="search" rounded placeholder="Suche ein Boot ..." icon="search" />
    </div>

    <div class="mt-4 flex flex-wrap max-w-4xl w-full">
      <Card
        v-for="bookable in searchResult"
        :key="bookable._id"
        is-open
        :closeable="false"
        :background="`/src/assets/images/${bookable._id}.jpg`"
        class="mt-4 rounded-2xl w-full"
      >
        <span>{{ bookable.name }}</span>
        <div v-if="bookable.tags.length > 0" class="mt-1 flex flex-row space-x-2">
          <span v-for="tag in bookable.tags" :key="tag" class="flex flex-col bg-gray-400 text-xs rounded-full px-2">{{
            tag
          }}</span>
        </div>
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: bookables
</route>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import Card from '~/components/Card.vue';
import useFind from '~/compositions/useFind';

export default defineComponent({
  name: 'Bookables',

  components: {
    Card,
  },

  setup() {
    const { data: bookables } = useFind('bookables');

    const search = ref('');
    const searchResult = computed(() => {
      if (!search.value) {
        return bookables.value;
      }

      return bookables.value.filter((bookable) => JSON.stringify(bookable).toLocaleLowerCase().includes(search.value));
    });

    return {
      search,
      searchResult,
    };
  },
});
</script>
