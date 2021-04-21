<template>
  <Card :background="isOpen ? '/src/assets/images/card-bg.jpg' : ''" :is-open="isOpen">
    <template #header>
      <div class="flex flex-row justify-between">
        <span v-if="bookable">{{ bookable.name }}</span>
        <span>{{ booking.startDate }}-{{ booking.endDate }}</span>
      </div>
    </template>

    <div class="flex flex-col">
      <span v-if="bookedBy" class="">{{ bookedBy.name }}</span>
      <span class="">{{ booking.note }}</span>
    </div>
  </Card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue';

import Card from '~/components/Card.vue';
import useGet from '~/compositions/useGet';
import Booking from '~/types/booking';

export default defineComponent({
  name: 'BookingCard',

  components: {
    Card,
  },

  props: {
    booking: {
      type: Object as PropType<Booking>,
      required: true,
    },

    isOpen: {
      type: Boolean,
      required: false,
    },
  },

  setup(props) {
    const bookingProp = toRef(props, 'booking');

    const bookableById = computed(() => bookingProp.value.bookable);
    const { data: bookable } = useGet('bookables', bookableById);

    const bookedById = computed(() => bookingProp.value.bookedBy);
    const { data: bookedBy } = useGet('users', bookedById);

    return {
      bookable,
      bookedBy,
    };
  },
});
</script>
