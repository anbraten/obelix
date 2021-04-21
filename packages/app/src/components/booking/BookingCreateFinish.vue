<template>
  <div class="flex flex-col h-full">
    <div>
      <div>
        <span>Start</span><span>{{ booking.startDate }}</span>
      </div>
      <div>
        <span>Ende</span><span>{{ booking.startDate }}</span>
      </div>
      <div>
        <span>Boot</span><span>{{ bookable?.name }}</span>
      </div>
      <div>
        <span>Bemerkung</span
        ><span>
          <o-input v-model="bookingNote" />
        </span>
      </div>
    </div>

    <div class="mt-4 flex flex-row justify-center content-center">
      <o-button @click="emit('back')">Zurück</o-button>
      <o-button class="ml-2" @click="emit('done')">Buchen</o-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue';

import useGet from '~/compositions/useGet';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCreateFinish',

  props: {
    booking: {
      type: Object as PropType<Partial<Booking>>,
      required: true,
    },
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:booking': (__booking: Partial<Booking>) => true,
    back: () => true,
    done: () => true,
  },

  setup(props, { emit }) {
    const booking = toRef(props, 'booking');

    const bookableId = computed(() => booking.value.bookable);
    const { data: bookable } = useGet('bookables', bookableId);

    const bookingNote = computed({
      get() {
        return booking.value.note || '';
      },
      set(value: string) {
        emit('update:booking', {
          ...booking.value,
          note: value,
        });
      },
    });

    return {
      bookable,
      emit,
      bookingNote,
    };
  },
});
</script>
