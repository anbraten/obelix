<template>
  <div class="flex flex-col mt-4">
    <o-steps v-model="activeStep" :has-navigation="false">
      <o-step-item icon="calendar-day">
        <BookingCreateDate v-model:booking="booking" @done="activeStep += 1" />
      </o-step-item>

      <o-step-item icon="ship">
        <BookingCreateBoat v-model:booking="booking" @done="activeStep += 1" />
      </o-step-item>

      <o-step-item icon="check">
        <!-- <BookingCreateFinish :booking="booking" @done="createBooking" @back="activeStep--" /> -->
      </o-step-item>
    </o-steps>

    <pre>{{ booking }}</pre>
  </div>
</template>

<route lang="yaml">
name: add-booking
</route>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import BookingCreateBoat from '~/components/booking/BookingCreateBoat.vue';
import BookingCreateDate from '~/components/booking/BookingCreateDate.vue';
// import BookingCreateFinish from '~/components/booking/BookingCreateFinish.vue';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCreate',

  components: {
    BookingCreateDate,
    BookingCreateBoat,
  },

  setup() {
    const activeStep = ref(1);
    const booking = ref<Partial<Booking>>({});

    // const isTraining = computed(() => selectedCategory.value === 'training');

    return {
      booking,
      activeStep,
    };
  },
});
</script>
