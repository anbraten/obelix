<template>
  <div class="bookings">
    <BookingsList />
  </div>
</template>

<script>
import BookingsList from '@/components/BookingsList.vue';

export default {
  name: 'Bookings',

  components: {
    BookingsList,
  },
};
</script>

<style lang="scss" scoped>
.bookings {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;
}
</style>
