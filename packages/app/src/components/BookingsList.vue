<template>
  <div class="bookings">

    <div class="head">
      <div class="date">
        <div @click="prevDay" class="prevDay button"><i class="fas fa-backward" /></div>
        <div class="selectedDate">
          {{ this.selectedDate | date }}
        </div>
        <div @click="today" class="today button">Heute</div>
        <div @click="nextDay" class="nextDay button"><i class="fas fa-forward" /></div>
      </div>

      <div class="actions">
        <b-button @click="newBooking" class="button">Boot ausleihen</b-button>
      </div>
    </div>

    <template v-if="bookings && bookings.length > 0">
      <div v-for="booking in bookings" :key="booking.id" class="booking">
        <span class="rentable">{{ booking.rentable.name }}</span>
        <span class="user">{{ booking.user.name }}</span>
        <span class="time">{{ booking.startTime }} - {{ booking.endTime }}</span>
        <div class="cancel" @click="cancelBooking(booking)"><i v-if="booking.user.id === userId" class="fas fa-trash" /></div>
      </div>
    </template>

    <div v-else-if="bookings.length === 0" class="empty">
      <span>Es liegen noch keine Reservierungen vor!</span>
    </div>

    <b-loading v-else :is-full-page="true" :active="true" :can-cancel="false" />
  </div>
</template>

<script>
import moment from 'moment';
import Debug from '@/libs/debug';
import { get } from 'lodash';

const debug = Debug('BookingsList');

export default {
  name: 'BookingsList',

  computed: {
    bookings() {
      const { bookings } = this.$store.state.rental;

      // TODO: sort by start-time
      return bookings[this.selectedDate] || [];
    },
    selectedDate() {
      if (this.$route.params.date) {
        return this.$route.params.date;
      }

      // default today
      return moment().format('YYYY-MM-DD');
    },
    userId() {
      return get(this, '$store.state.auth.user.profile.sub', null);
    },
  },

  watch: {
    async selectedDate() {
      await this.loadBookings();
    },
  },

  async created() {
    if (!moment(this.selectedDate, 'YYYY-MM-DD', true).isValid()) {
      const date = moment().format('YYYY-MM-DD');
      this.$router.replace({ params: { date } });
      return;
    }

    await this.loadBookings();
  },

  methods: {
    today() {
      this.$router.replace({ params: { date: null } });
    },
    nextDay() {
      // TODO: max 7 days from today
      const date = moment(this.selectedDate).add(1, 'days').format('YYYY-MM-DD');
      this.$router.replace({ params: { date } });
    },
    prevDay() {
      const date = moment(this.selectedDate).subtract(1, 'days').format('YYYY-MM-DD');
      this.$router.replace({ params: { date } });
    },
    newBooking() {
      this.$router.push({ name: 'booking-create', params: { date: this.selectedDate } });
    },
    async loadBookings() {
      await this.$store.dispatch('rental/getBookings', this.selectedDate);
    },
    async cancelBooking(booking) {
      this.$buefy.dialog.confirm({
        title: 'Reservierung löschen',
        message: 'Möchtest du deine Reservierung wirklich löschen?',
        cancelText: 'Abbrechen',
        confirmText: 'Löschen',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          try {
            await this.$store.dispatch('rental/cancelBooking', booking.id);
          } catch (error) {
            debug(error);
            this.$buefy.toast.open({
              message: 'Es ist ein Fehler aufgetreten.',
              position: 'is-top',
              type: 'is-danger',
            });
            return;
          }

          await this.loadBookings();

          this.$buefy.toast.open({
            message: 'Deine Reservierung wurde erfolgreich storniert.',
            position: 'is-top',
            type: 'is-light',
          });
        },
      });
    },
  },

  filters: {
    date(date) {
      return moment(date).format('dddd - D. MMMM YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
.bookings {
  display: flex;
  flex-flow: column;
  margin-top: 2rem;

  .head {
    margin-bottom: 2rem;

    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      > * {
        margin: 0 0.5rem;
      }
    }

    .actions {
      display: flex;
      justify-content: center;
    }
  }

  .empty {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

.booking {
  display: flex;
  padding: 0.5rem 1rem;
  flex-flow: row;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100,121,143,0.122);
  cursor: pointer;

  &:hover {
    -webkit-box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    z-index: 1;
  }

  .rentable {
    width: 30%;
  }

  .user {
    width: 45%;
  }

  .time {
    width: 20%;
  }

  .cancel {
    text-align: right;
    width: 5%;
  }
}
</style>
