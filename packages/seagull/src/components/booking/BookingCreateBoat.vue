<template>
  <div class="flex flex-col">
    <p>Wähle ein Boot</p>

    <div>{{ bookables }}</div>

    <div class="mt-4 flex flex-row justify-center content-center">
      <o-button :disabled="!isValid" @click="submit">
        Weiter
      </o-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue';

import useFind from '~/compositions/useFind';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCreateBoat',

  props: {
    booking: {
      type: Object as PropType<Partial<Booking>>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const booking = toRef(props, 'booking');

    const submit = () => {
      emit('update:booking', {
        ...booking.value,
      });

      emit('done');
    };

    const isValid = computed(() => booking.value.bookable);
    const { data: bookables } = useFind('bookables');

    return { submit, isValid, bookables };
  },
});
</script>
