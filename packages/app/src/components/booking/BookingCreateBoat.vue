<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col items-center">
      <span class="text-2xl">Wähle ein Boot</span>

      <div class="flex space-x-2 mt-4">
        <div
          v-for="tag in bookablesTags"
          :key="tag"
          class="flex border-1 bg-white rounded-full px-2 py-0.5 cursor-pointer relative"
          :class="{
            'bg-primary border-transparent text-white': selectedTags.includes(tag),
            'border-gray-400': !selectedTags.includes(tag),
          }"
          @click="clickTag(tag)"
        >
          <span>{{ tag }}</span>
        </div>
      </div>
    </div>

    <template v-if="filteredBookables.length > 0">
      <div
        v-for="bookable in filteredBookables"
        :key="bookable._id"
        class="flex border-1 border-gray-200 rounded-lg shadow-md px-4 py-2 mt-4"
        :class="{
          'bg-red-100 cursor-not-allowed': bookedBookables.includes(bookable._id),
          'hover:border-gray-400 cursor-pointer': !bookedBookables.includes(bookable._id),
        }"
        @click="selectBookable(bookable)"
      >
        <o-icon v-if="bookedBookables.includes(bookable._id)" pack="fas" icon="times" />
        <o-icon v-else-if="booking?.bookable === bookable._id" pack="fas" icon="check" />
        <o-icon v-else pack="far" icon="circle" />

        <div class="ml-4 flex flex-col">
          <span>{{ bookable.name }}</span>
          <div class="mt-1 flex flex-row space-x-2">
            <span
              v-for="tag in bookable.tags"
              :key="tag"
              :class="{
                'bg-primary border-transparent text-white': selectedTags.includes(tag),
                'bg-gray-200': !selectedTags.includes(tag),
              }"
              class="flex flex-col text-xs border-1 rounded-full px-2"
              >{{ tag }}</span
            >
          </div>
        </div>
      </div>
    </template>
    <div v-else class="flex flex-col w-full mt-16 mb-auto items-center">
      <span>Keine Boote gefunden.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef } from 'vue';

import useFind from '~/compositions/useFind';
import Bookable from '~/types/bookable';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCreateBoat',

  props: {
    booking: {
      type: Object as PropType<Partial<Booking>>,
      required: true,
    },
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:booking': (__booking: Partial<Booking>) => true,
  },

  setup(props, { emit }) {
    const booking = toRef(props, 'booking');

    // TODO
    const bookedBookables = ref<string[]>(['60696b5153da9b3663e02dfc']);

    const selectBookable = (selectedBookable: Bookable) => {
      if (bookedBookables.value.includes(selectedBookable._id)) {
        return;
      }

      // unselect if clicked again
      if (selectedBookable._id === booking.value.bookable) {
        emit('update:booking', {
          ...booking.value,
          bookable: undefined,
        });
        return;
      }

      emit('update:booking', {
        ...booking.value,
        bookable: selectedBookable._id,
      });
    };

    const { data: bookables } = useFind('bookables');

    const bookablesTags = computed(() =>
      bookables.value.reduce((tags, b) => [...tags, ...b.tags.filter((t) => !tags.includes(t))], [] as string[]),
    );
    const selectedTags = ref<string[]>([]);

    const clickTag = (tag: string) => {
      if (selectedTags.value.includes(tag)) {
        selectedTags.value = selectedTags.value.filter((t) => t !== tag);
        return;
      }

      selectedTags.value.push(tag);
    };

    const filteredBookables = computed(() =>
      bookables.value.filter((b) => selectedTags.value.every((t) => b.tags.includes(t))),
    );

    return {
      selectBookable,
      bookedBookables,
      filteredBookables,
      bookablesTags,
      selectedTags,
      clickTag,
    };
  },
});
</script>
