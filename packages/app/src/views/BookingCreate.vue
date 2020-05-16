<template>
  <div class="booking">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Neues Boot ausleihen</div>
      <div />
    </div>

    <b-steps v-model="activeStep" :has-navigation="false">
      <b-step-item icon="calendar-day">
        <BookingCreateDate @done="updateDate" />
      </b-step-item>

      <b-step-item icon="grip-horizontal">
        <BookingCreateCategory @done="updateCategory" @back="activeStep--" />
      </b-step-item>

      <b-step-item icon="ship">
       <BookingCreateRentable :booking="booking" :category="selectedCategory" @done="updateRentable" @back="activeStep--" />
      </b-step-item>

      <b-step-item icon="check">
        <BookingCreateFinish :booking="booking" :rentable="selectedRentable" @done="createBooking" @back="activeStep--" />
      </b-step-item>
    </b-steps>
  </div>
</template>

<script>
import BookingCreateDate from '@/components/booking/BookingCreateDate.vue';
import BookingCreateCategory from '@/components/booking/BookingCreateCategory.vue';
import BookingCreateRentable from '@/components/booking/BookingCreateRentable.vue';
import BookingCreateFinish from '@/components/booking/BookingCreateFinish.vue';

export default {
  name: 'BookingCreate',

  components: {
    BookingCreateDate,
    BookingCreateCategory,
    BookingCreateRentable,
    BookingCreateFinish,
  },

  data() {
    return {
      activeStep: 0,
      selectedCategory: null,
      selectedRentable: null,
      booking: null,
    };
  },

  watch: {
    activeStep(step) {
      // step: select category
      if (step === 1) {
        this.$store.dispatch('rental/getCategories');
      }

      // step: select rentable
      if (step === 2) {
        this.$store.dispatch('rental/getBookings', this.booking.date);
        this.$store.dispatch('rental/getRentables');
      }
    },
  },

  methods: {
    updateDate(booking) {
      this.booking = booking;
      this.activeStep += 1;
    },
    updateCategory(category) {
      this.selectedCategory = category;
      this.activeStep += 1;
    },
    updateRentable(rentable) {
      this.selectedRentable = rentable;
      this.booking.rentable = rentable.id;
      this.activeStep += 1;
    },
    async createBooking(booking) {
      await this.$store.dispatch('rental/createBooking', booking);
      // check if booking was successfull
      this.$buefy.toast.open({
        message: 'Deine Reservierung war erfolgreich.',
        position: 'is-top',
        type: 'is-success',
      });

      this.$router.replace({ name: 'bookings', hash: `#${booking.date}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.booking {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 .5rem;

    .head-title {
      font-size: 1.5rem;
    }
  }
}

::v-deep.step-item {
  .step-title {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    .prev {
      margin-right: 1rem;
    }
  }
}
</style>
