<template>
  <date-slider v-model:selected-date="selectedDate" />
  <div class="flex flex-col flex-grow overflow-y-auto px-4 pb-4 relative">
    <span>Montag, {{ selectedDate.format('DD.MM.YYYY') }}</span>

    <div class="mt-4">
      <booking-card
        v-for="(booking, index) in bookings"
        :key="booking._id"
        class="-mt-2"
        :class="{ 'rounded-xl': index == Object.keys(bookings).length - 1 }"
        :booking="booking"
        :is-open="selectedBooking && selectedBooking._id === booking._id"
        @click="clickBooking(booking)"
      />
    </div>

    <floating-button class="fixed bottom-20 right-4" icon="plus" @click="router.push({ name: 'add-booking' })" />
  </div>
</template>

<route lang="yaml">
name: bookings
</route>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

import Booking from '~/types/booking';

import BookingCard from '~/components/BookingCard.vue';
import DateSlider from '~/components/atomic/DateSlider.vue';
import FloatingButton from '~/components/atomic/FloatingButton.vue';

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

    const raw = [
      {
        _id: 'booking:1',
        startDate: Date.now(),
        bookable: 'bookable:123',
        bookedBy: 'user:anton',
        note: 'Wir wollen die Sonne genießen!',
      },
      {
        _id: 'booking:2',
        startDate: Date.now(),
        bookable: 'bookable:123',
        bookedBy: 'user:anton',
        note: 'Wir wollen die Sonne genießen!',
      },
      {
        _id: 'booking:3',
        startDate: Date.now(),
        bookable: 'bookable:123',
        bookedBy: 'user:anton',
        note: 'Wir wollen die Sonne genießen!',
      },
      {
        _id: 'booking:4',
        startDate: Date.now(),
        bookable: 'bookable:123',
        bookedBy: 'user:anton',
        note: 'Wir wollen die Sonne genießen!',
      },
    ];

    // const rawBookings = ref([...raw, ...raw, ...raw, ...raw, ...raw]);
    const rawBookings = ref(raw);
    const bookings = computed(() => rawBookings.value.map(booking => ({
      ...booking,
      time: '13:00 - 14:00',
    })));

    const selectedBooking = ref<Booking>();

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
