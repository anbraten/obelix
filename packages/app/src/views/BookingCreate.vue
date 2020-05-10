<template>
  <div class="booking">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Neues Boot ausleihen</div>
      <div />
    </div>

    <b-steps v-model="activeStep" :has-navigation="false">
      <b-step-item icon="calendar-day">

        <form-group :validator="$v.booking.date" label="Datum">
          <b-datepicker
            :value="selectedDate"
            @input="updateDate"
            :date-formatter="dateFormatter"
            :min-date="minDate"
            :max-date="maxDate" />
        </form-group>

        <form-group :validator="$v.booking.startTime" label="Startzeit">
          <b-input
            v-cleave="masks.time"
            :value="booking.startTime"
            @input.native="updateStartTime"
            placeholder="HH:MM" />
        </form-group>

        <form-group :validator="$v.booking.endTime" label="Endzeit">
          <b-input
            v-cleave="masks.time"
            :value="booking.endTime"
            @input.native="updateEndTime"
            placeholder="HH:MM" />
        </form-group>

        <div class="actions">
          <b-button class="next" @click="activeStep++" :disabled="$v.$invalid">Weiter</b-button>
        </div>
      </b-step-item>

      <b-step-item icon="grip-horizontal">
        <div class="step-title">Wähle einen Boots-Typen aus.</div>
        <template v-if="categories">
          <div v-for="category in categories" :key="category.id" @click="selectCategory(category)" class="rentable">
            <span>{{ category.name }}</span>
          </div>
        </template>
        <div class="actions">
          <b-button class="next" @click="activeStep--">Zurück</b-button>
        </div>
      </b-step-item>

      <b-step-item icon="ship">
        <div class="step-title">Wähle ein Boot aus.</div>
        <template v-if="rentables">
          <template v-for="rentable in rentables">
            <div :key="rentable.id" @click="selectRentable(rentable)" class="rentable" :class="rentable.canBook ? '' : 'booked'">
              <span class="name"><b-icon pack="fas" icon="ship" size="is-small"/> {{ rentable.name }}</span>
              <span v-if="rentable.bookingInfo" class="info"><b-icon pack="fas" icon="info" size="is-small"/> {{ rentable.bookingInfo }}</span>
            </div>
          </template>
        </template>
        <div class="actions">
         <b-button class="next" @click="activeStep--">Zurück</b-button>
        </div>
      </b-step-item>

      <b-step-item icon="check">
        <div class="step-title">Du möchtest folgende Reservierung aufgeben?</div>
        <template v-if="booking">
          <b-field label="Datum">
            <span>{{ booking.date | date }}</span>
          </b-field>
          <b-field v-if="booking" label="Zeit">
            <span>{{ booking.startTime | time }} bis {{ booking.endTime | time }}</span>
          </b-field>
          <b-field v-if="selectedRentable" label="Boot">
            <span>{{ selectedRentable.name }}</span>
          </b-field>
          <b-field label="Bemerkung" grouped group-multiline>
            <div class="control description" style="flex-shrink: 1">
              <span><b-icon pack="fas" icon="info" size="is-small" /> Du kannst hier eine öffentliche Bemerkung zu deiner Reservierung hinterlegen.</span>
            </div>
            <b-input v-model="booking.note" maxlength="100" type="textarea" expanded placeholder="Bsp: Ich werde wahrscheinlich Richtung Freudenholm fahren." />
          </b-field>
          <div class="actions">
            <b-button class="prev" @click="activeStep--">Zurück</b-button>
            <b-button class="next" @click="createBooking">Reservieren</b-button>
          </div>
        </template>
      </b-step-item>
    </b-steps>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { required } from 'vuelidate/lib/validators';

import cleave from '@/libs/cleave';
import {
  time,
  timeLater,
  futureDate,
  timeBetween,
} from '@/libs/vuelidate';
import {
  timeRange,
  dateFormat,
  prettyDateFormat,
  timeFormat,
} from '@/libs/momentUtils';

const moment = extendMoment(Moment);

export default {
  name: 'BookingCreate',

  directives: { cleave },

  data() {
    return {
      activeStep: 0,
      selectedRentable: null,
      selectedCategory: null,
      booking: {
        date: null,
        startTime: '',
        endTime: '',
        note: null,
      },
      masks: {
        time: {
          time: true,
          timePattern: ['h', 'm'],
        },
      },
    };
  },

  validations: {
    booking: {
      date: {
        required,
        futureDate,
      },
      startTime: {
        required,
        time,
      },
      endTime: {
        required,
        time,
        timeBetween: timeBetween('startTime', 1, 4), // min 1 hours, max 4 hours
        timeLater: timeLater('startTime'),
      },
    },
  },

  computed: {
    ...mapState('rental', [
      'categories',
    ]),
    bookedRentables() {
      if (!this.selectedCategory) {
        return null;
      }

      let bookings = this.$store.state.rental.bookings[this.booking.date] || [];

      // start & end time
      const newBookingRange = timeRange(this.booking.startTime, this.booking.endTime);

      bookings = bookings.filter((booking) => {
        const bookingRange = timeRange(booking.startTime, booking.endTime);
        return newBookingRange.overlaps(bookingRange);
      });

      const bookedRentables = bookings.map((booking) => booking.rentable.id);

      return bookedRentables;
    },
    rentables() {
      if (!this.selectedCategory) {
        return null;
      }

      let rentables = this.$store.state.rental.rentables || [];
      rentables = rentables.filter((rentable) => rentable.category === this.selectedCategory.id);

      rentables = rentables.map((rentable) => {
        let canBook = true;

        if (this.bookedRentables.includes(rentable.id)) {
          canBook = false;
        }

        return {
          ...rentable,
          canBook,
        };
      });

      return rentables.sort((a, b) => a.name.localeCompare(b.name));
    },
    selectedDate() {
      return moment(this.booking.date, dateFormat).toDate();
    },
    minDate() {
      return moment().subtract(1, 'days').toDate();
    },
    maxDate() {
      // TODO: allow 28 days for trainer
      return moment().add(7, 'days').toDate();
    },
  },

  watch: {
    activeStep(step) {
      // step: select category
      if (step === 1) {
        this.$store.dispatch('rental/getCategories');
        this.$store.dispatch('rental/getBookings', this.booking.date);
      }

      // step: select rentable
      if (step === 2) {
        this.$store.dispatch('rental/getRentables');
      }
    },
  },

  async mounted() {
    if (this.$route.hash) {
      // hash without #
      this.booking.date = this.$route.hash.substr(1);
    } else {
      // today
      this.booking.date = moment().format(dateFormat);
    }

    await this.$store.dispatch('rental/getCategories');
  },

  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.activeStep += 1;
    },
    selectRentable(rentable) {
      if (!rentable.canBook) {
        this.$buefy.dialog.alert({
          title: 'Bereits reserviert!',
          message: 'Dieses Boot ist in deinem gewählten Zeitraum leider schon reserviert.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        });
        return;
      }

      if (rentable.bookingAlert) {
        this.$buefy.dialog.confirm({
          message: rentable.bookingAlert,
          confirmText: 'Fortfahren',
          cancelText: 'Abbrechen',
          type: 'is-warning',
          hasIcon: true,
          icon: 'exclamation-triangle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
          onConfirm: () => {
            this.selectedRentable = rentable;
            this.activeStep += 1;
          },
        });
        return;
      }

      this.selectedRentable = rentable;
      this.activeStep += 1;
    },
    async createBooking() {
      const booking = {
        date: this.booking.date,
        startTime: this.booking.startTime,
        endTime: this.booking.endTime,
        note: this.booking.note,
        rentable: this.selectedRentable.id,
      };

      await this.$store.dispatch('rental/createBooking', booking);
      // check if booking was successfull
      this.$buefy.toast.open({
        message: 'Deine Reservierung war erfolgreich.',
        position: 'is-top',
        type: 'is-success',
      });
      this.$router.replace({ name: 'home', params: { date: booking.date } });
      // redirect to date overview
    },
    dateFormatter(date) {
      return moment(date).format(prettyDateFormat);
    },
    updateDate(date) {
      this.booking.date = moment(date).format(dateFormat);
      this.$v.booking.date.$touch();
    },
    updateStartTime({ target }) {
      this.booking.startTime = target._vCleave.getFormattedValue();
      this.$v.booking.startTime.$touch();
    },
    updateEndTime({ target }) {
      this.booking.endTime = target._vCleave.getFormattedValue();
      this.$v.booking.endTime.$touch();
    },
  },

  filters: {
    date(date) {
      return moment(date).format(prettyDateFormat);
    },
    time(date) {
      if (!date || !RegExp('\\d\\d:\\d\\d').test(date)) {
        return null;
      }
      return moment(date, timeFormat).format(timeFormat);
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

.step-item {
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

.rentable {
  display: flex;
  padding: 0.5rem 1rem;
  flex-flow: row;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100,121,143,0.122);
  text-align: left;
  cursor: pointer;
  align-content: center;

  &:hover {
    -webkit-box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    z-index: 1;
  }

  &.booked {
    background: hsl(348, 80%, 61%);
  }

  .info {
    margin-left: auto;
  }
}
</style>
