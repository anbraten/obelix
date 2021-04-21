<template>
  <div class="flex flex-col mt-4 max-w-2xl w-full mx-auto">
    <o-steps v-model="activeStep" :has-navigation="false">
      <o-step-item icon="calendar-day">
        <BookingCreateDate v-model:booking="booking" @done="activeStep += 1" />
      </o-step-item>

      <o-step-item icon="ship">
        <BookingCreateBoat v-model:booking="booking" @done="activeStep += 1" @back="activeStep -= 1" />
      </o-step-item>

      <o-step-item icon="check">
        <BookingCreateFinish v-model:booking="booking" @done="createBooking" @back="activeStep--" />
      </o-step-item>
    </o-steps>
  </div>
</template>

<route lang="yaml">
name: add-booking
</route>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import BookingCreateBoat from '~/components/booking/BookingCreateBoat.vue';
import BookingCreateDate from '~/components/booking/BookingCreateDate.vue';
import BookingCreateFinish from '~/components/booking/BookingCreateFinish.vue';
import { user } from '~/compositions/useAuthentication';
import feathers from '~/compositions/useBackend';
import router from '~/router';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCreate',

  components: {
    BookingCreateDate,
    BookingCreateBoat,
    BookingCreateFinish,
  },

  setup() {
    const activeStep = ref(1);
    const booking = ref<Partial<Booking>>({
      bookedBy: user.value?._id,
    });

    const createBooking = async () => {
      await feathers.service('bookings').create(booking.value);
      await router.replace({ name: 'bookings' });
    };

    return {
      booking,
      activeStep,
      createBooking,
    };
  },
});
</script>
