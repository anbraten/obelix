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

      <div v-if="canBook" class="actions">
        <b-button @click="newBooking" class="button">Boot ausleihen</b-button>
      </div>
    </div>

    <template v-if="bookings && bookings.length > 0">
      <div v-for="booking in bookings" :key="booking.id" class="booking">
        <span class="rentable"><b-icon pack="fas" icon="ship" size="is-small"/> {{ booking.rentable.name }}</span>
        <span class="time"><b-icon pack="fas" icon="clock" size="is-small"/> {{ booking.startTime }} - {{ booking.endTime }}</span>
        <span class="user"><b-icon pack="fas" icon="user" size="is-small"/> {{ booking.user.name }}</span>
        <span class="note" v-if="booking.note"><b-icon pack="fas" icon="sticky-note" size="is-small" /> {{ booking.note }}</span>
        <div class="actions">
          <div class="remove" v-if="booking.canCancel" @click="cancelBooking(booking)">
            <b-icon pack="fas" icon="trash"  size="is-small" />
          </div>
        </div>
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
import { get } from 'lodash';
import Debug from '@/libs/debug';
import {
  isFutureDate,
  diffFromToday,
  dateFormat,
  dateTimeFormat,
  isPastDate,
  isToday,
  isValidDate,
} from '@/libs/momentUtils';
import { mapGetters } from 'vuex';

const debug = Debug('Bookings');

export default {
  name: 'Bookings',

  computed: {
    ...mapGetters('rental', [
      'isTrainer',
    ]),
    bookings() {
      let bookings = this.$store.state.rental.bookings[this.selectedDate] || [];

      bookings = bookings.sort((a, b) => new Date(`1970/01/01 ${a.startTime}`) - new Date(`1970/01/01 ${b.startTime}`));

      bookings = bookings.map((booking) => {
        const date = moment(`${booking.date} ${booking.startTime}`, dateTimeFormat);
        const isInPast = isPastDate(date, 'hours');
        const canCancel = booking.user.id === this.userId && !isInPast;

        return {
          ...booking,
          canCancel,
        };
      });

      return bookings;
    },
    selectedDate() {
      if (this.$route.hash) {
        // hash without #
        return this.$route.hash.substr(1);
      }

      // default today
      return moment().format(dateFormat);
    },
    userId() {
      return get(this, '$store.state.auth.user.profile.sub', null);
    },
    canBook() {
      const date = moment(this.selectedDate, dateFormat);

      const days = this.isTrainer ? (3 * 7) : 7; // trainers get 3 weeks
      const isInDiff = Math.abs(diffFromToday(date, 'days')) < days;

      return isToday(date) || (isFutureDate(date) && isInDiff);
    },
  },

  watch: {
    async selectedDate() {
      await this.loadBookings();
    },
  },

  async mounted() {
    if (!isValidDate(this.selectedDate)) {
      this.$router.replace({ hash: null });
      return;
    }

    await this.loadBookings();
  },

  methods: {
    today() {
      this.$router.replace({ params: { date: null } });
    },
    nextDay() {
      const date = moment(this.selectedDate, dateFormat).add(1, 'days').format(dateFormat);
      this.$router.replace({ hash: `#${date}` });
    },
    prevDay() {
      const date = moment(this.selectedDate, dateFormat).subtract(1, 'days').format(dateFormat);
      this.$router.replace({ hash: `#${date}` });
    },
    newBooking() {
      this.$router.push({ name: 'booking-create', hash: `#${this.selectedDate}` });
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
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;

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
  flex-wrap: wrap !important;
  padding: 0.5rem 1rem;
  flex-flow: row;
  max-width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100,121,143,0.122);
  cursor: pointer;

  &:hover {
    -webkit-box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    z-index: 1;
  }

  .rentable {
    width: 50%;
    margin-bottom: .25rem;
  }

  .user {
    width: 100%;
  }

  .time {
    text-align: right;
    width: 50%;
  }

  .note {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .actions {
    margin-left: auto;
    text-align: right;
    width: 5%;

    .remove {
      color: hsl(348, 80%, 61%);
    }
  }

  @media screen and (min-width: 768px) {
    .rentable {
      order: 1;
      width: 30%;
      text-align: left;
      margin-bottom: 0;
    }

    .user {
      order: 2;
      width: 45%;
    }

    .time {
      order: 3;
      width: 25%;
    }

    .actions {
      order: 4;
      text-align: right;
      width: 5%;
    }

    .note {
      order: 5;
      width: 100%;
    }
  }
}
</style>
