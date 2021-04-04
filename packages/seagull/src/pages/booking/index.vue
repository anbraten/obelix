<template>
  <DateSlider v-model:selected-date="selectedDate" />
  <div class="flex flex-col flex-grow overflow-y-auto px-4 pb-4 relative items-center">
    <div class="flex flex-col mt-4 max-w-2xl w-full h-full">
      <template v-if="bookings && bookings.length > 0">
        <BookingCard
          v-for="(booking, index) in bookings"
          :key="booking._id"
          class="-mt-2"
          :class="{ 'rounded-xl': index == Object.keys(bookings).length - 1 }"
          :booking="booking"
          :is-open="selectedBooking && selectedBooking._id === booking._id"
          @click="clickBooking(booking)"
        />
      </template>
      <p v-else class="m-auto">
        Aktuell gibt es für den {{ selectedDate.format('DD.MM.YYYY') }} noch keine Reservierungen.
      </p>
    </div>

    <FloatingButton class="fixed bottom-20 right-4" icon="plus" @click="router.push({ name: 'add-booking' })" />
  </div>
</template>

<route lang="yaml">
name: bookings
</route>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import DateSlider from '~/components/atomic/DateSlider.vue';
import FloatingButton from '~/components/atomic/FloatingButton.vue';
import BookingCard from '~/components/BookingCard.vue';
import useFind from '~/compositions/useFind';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'Bookings',

  components: {
    DateSlider,
    BookingCard,
    FloatingButton,
  },

  setup() {
    const router = useRouter();

    const selectedDate = ref(dayjs());
    const { data: bookings } = useFind('bookings');
    const selectedBooking = ref<Booking | undefined>(bookings.value[bookings.value.length - 1]);

    const clickBooking = (booking: Booking) => {
      if (selectedBooking.value && selectedBooking.value._id === booking._id) {
        selectedBooking.value = undefined;
        return;
      }

      selectedBooking.value = booking;
    };

    return {
      router,
      bookings,
      selectedDate,
      selectedBooking,
      clickBooking,
    };
  },
});
</script>
