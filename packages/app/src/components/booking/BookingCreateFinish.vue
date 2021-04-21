<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col space-y-4">
      <div class="flex justify-between">
        <span class="font-bold">Datum</span><span>{{ date }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-bold">Zeit</span><span>{{ startTime }} - {{ endTime }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-bold">Boot</span><span>{{ bookable?.name }}</span>
      </div>
      <div class="flex flex-col">
        <span class="font-bold">Bemerkung</span>
        <span class="text-sm"
          >Diese Bemerkung wird später öffentlich sichtbar zusammen mit deiner Buchung angezeigt.</span
        >
        <o-input
          v-model="bookingNote"
          maxlength="200"
          type="textarea"
          placeholder="Beispiel: Ich werde wahrscheinlich nach Wahlstorf fahren."
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, defineComponent, PropType, toRef } from 'vue';

import useGet from '~/compositions/useGet';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCreateFinish',

  props: {
    // eslint-disable-next-line vue/no-unused-properties
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

    const startTime = computed(() => booking.value && dayjs(booking.value.startDate).format('HH:mm'));
    const endTime = computed(() => booking.value && dayjs(booking.value.endDate).format('HH:mm'));
    const date = computed(() => booking.value && dayjs(booking.value.startDate).format('DD.MM.YYYY'));

    return {
      bookable,
      emit,
      bookingNote,
      date,
      startTime,
      endTime,
    };
  },
});
</script>
