<template>
  <div class="flex p-4 justify-center items-center w-full max-w-2xl px-4 md:mx-auto">
    <div class="px-2 cursor-pointer" @click="$router.replace({ name: 'bookings' })">
      <o-icon pack="fas" icon="times" />
    </div>
    <span class="mx-auto text-xl">Neue Reservierungen</span>
  </div>

  <div class="flex flex-col mt-8 max-w-2xl w-full mx-auto">
    <o-steps v-model="activeStep" :has-navigation="false">
      <o-step-item icon="calendar-day">
        <BookingCreateDate v-model:booking="booking" />
      </o-step-item>

      <o-step-item icon="ship">
        <BookingCreateBoat v-model:booking="booking" />
      </o-step-item>

      <o-step-item icon="check">
        <BookingCreateFinish v-model:booking="booking" />
      </o-step-item>
    </o-steps>
  </div>

  <div class="flex flex-row mt-auto mb-4 px-4 max-w-2xl w-full mx-auto justify-center content-center space-x-2">
    <o-button v-if="activeStep > 1" size="medium" @click="activeStep -= 1">&lt;</o-button>
    <o-button v-if="activeStep !== 3" size="medium" :disabled="!isValid" class="flex-grow" @click="activeStep += 1"
      >Weiter</o-button
    >
    <o-button v-if="activeStep === 3" size="medium" :disabled="!isValid" class="flex-grow" @click="createBooking"
      >Reservieren</o-button
    >
  </div>
</template>

<route lang="yaml">
name: booking-create
meta:
  layout: default-no-footer
</route>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import BookingCreateBoat from '~/components/booking/BookingCreateBoat.vue';
import BookingCreateDate from '~/components/booking/BookingCreateDate.vue';
import BookingCreateFinish from '~/components/booking/BookingCreateFinish.vue';
import { user } from '~/compositions/useAuthentication';
import feathers from '~/compositions/useBackend';
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
    const router = useRouter();

    const isValid = computed(() => {
      if (activeStep.value === 1 && booking.value.startDate && booking.value.endDate) {
        return true;
      }

      if (activeStep.value === 2 && booking.value.bookable) {
        return true;
      }

      if (activeStep.value === 3) {
        return true;
      }

      return false;
    });

    const createBooking = async () => {
      await feathers.service('bookings').create(booking.value);
      await router.replace({ name: 'bookings' });
    };

    return {
      booking,
      activeStep,
      isValid,
      createBooking,
    };
  },
});
</script>
