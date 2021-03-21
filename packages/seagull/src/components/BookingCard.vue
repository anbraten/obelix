<template>
  <card :background="isOpen ? '/src/assets/images/card-bg.jpg' : ''" :is-open="isOpen">
    <template #header>
      <div class="flex flex-row justify-between">
        <span>{{ bookable.name }}</span>
        <span>{{ booking.time }}</span>
      </div>
    </template>

    <div class="flex flex-col">
      <span class="">{{ bookedBy.name }}</span>
      <span class="">{{ booking.note }}</span>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import Bookable from '~/types/bookable';
import Booking from '~/types/booking';
import User from '~/types/user';

import Card from '~/components/Card.vue';

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
    // TODO: load bookable of booking
    const bookable = ref<Bookable>({
      _id: props.booking.bookable,
      name: 'Pegasus',
      category: 'category:1',
    });

    const bookedBy = ref<User>({
      _id: props.booking.bookedBy,
      name: 'Alice',
      email: '',
    });

    return {
      bookable,
      bookedBy,
    };
  },
});
</script>
