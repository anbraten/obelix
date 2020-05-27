<template>
  <div class="bookings">

    <div class="head">
      <div class="date">
        <div @click="prevDay" class="prevDay button"><i class="fas fa-backward" /></div>
        <div class="selectedDate">
          {{ this.selectedDate | date }}
        </div>
        <div v-if="!isTodaySelected" @click="today" class="today button">Heute</div>
        <div @click="nextDay" class="nextDay button"><i class="fas fa-forward" /></div>
      </div>

      <div v-if="canBook" class="actions">
        <b-button @click="newBooking" class="button">Boot ausleihen</b-button>
      </div>
    </div>

    <template v-if="bookings && bookings.length > 0">
      <div v-for="booking in bookings" :key="booking.id" class="booking">
        <div class="rentables">
          <div v-for="rentable in booking.rentables" :key="rentable.id" class="rentable">
            <b-icon class="icon" pack="fas" icon="ship" size="is-small"/><span>{{ rentable.name }}</span>
          </div>
        </div>
        <div class="time">
          <b-icon class="icon" pack="fas" icon="clock" size="is-small"/>
          <span>{{ booking.startTime }} - {{ booking.endTime }}</span>
        </div>
        <div class="user">
          <b-icon class="icon" pack="fas" icon="user" size="is-small"/>
          <span>{{ booking.user.name }}</span>
        </div>
        <div class="note" v-if="booking.note">
          <b-icon class="icon" pack="fas" icon="sticky-note" size="is-small" />
          <span>{{ booking.note }}</span>
        </div>
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
    rentables() {
      return this.$store.state.rental.rentables || [];
    },
    bookings() {
      let bookings = this.$store.state.rental.bookings[this.selectedDate] || [];

      bookings = bookings.sort((a, b) => new Date(`1970/01/01 ${a.startTime}`) - new Date(`1970/01/01 ${b.startTime}`));

      bookings = bookings.map((booking) => {
        const date = moment(`${booking.date} ${booking.startTime}`, dateTimeFormat);
        const isInPast = isPastDate(date, 'minutes');
        const canCancel = booking.user.id === this.userId && !isInPast;
        const rentables = booking.rentables.map((id) => this.rentables.find((rentable) => rentable.id === id));

        return {
          ...booking,
          canCancel,
          rentables,
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
      return this.$store.getters['auth/userId'];
    },
    canBook() {
      const date = moment(this.selectedDate, dateFormat);

      const days = this.isTrainer ? (3 * 7) : 7; // trainers get 3 weeks
      const isInDiff = Math.abs(diffFromToday(date, 'days')) < days;

      return isToday(date) || (isFutureDate(date) && isInDiff);
    },
    isTodaySelected() {
      return isToday(moment(this.selectedDate, dateFormat));
    },
  },

  watch: {
    async selectedDate() {
      await this.loadData();
    },
  },

  async mounted() {
    if (!isValidDate(this.selectedDate)) {
      this.$router.replace({ hash: null });
      return;
    }

    await this.loadData();
  },

  methods: {
    today() {
      if (!this.$route.hash) { return; }
      this.$router.replace({ hash: null });
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
    async loadData() {
      await this.$store.dispatch('rental/getRentables');
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

          await this.loadData();

          this.$buefy.toast.open({
            message: 'Deine Reservierung wurde erfolgreich storniert.',
            position: 'is-top',
            type: 'is-success',
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
      margin: 0 auto;
      align-items: center;
      margin-bottom: 1rem;

      @media screen and (min-width: 768px) {
        max-width: 75%;
      }

      .selectedDate {
        margin: 0 auto;
      }

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
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    z-index: 1;
  }

  .icon {
    margin-right: .5rem;
  }

  .rentables {
    width: 50%;
    margin-bottom: .25rem;

    .rentable {
      display: flex;
      align-items: center;
      margin-top: .25rem;

      &:first-of-type {
        margin-top: 0;
      }
    }
  }

  .user {
    width: 100%;
  }

  .time {
    text-align: right;
    width: 50%;
  }

  .note {
    margin-top: .5rem;
    padding: .5rem;
    width: 100%;
    border-radius: 5px;
    background: #eee;
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
    .rentables {
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
