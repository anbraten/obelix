<template>
  <div class="step">
    <form-group v-if="form.date" :validator="$v.form.date" label="Datum">
      <b-datepicker
        :value="selectedDate"
        :date-formatter="dateFormatter"
        :min-date="minDate"
        :max-date="maxDate"
        @input="updateDate"
      />
    </form-group>

    <form-group :validator="$v.form.startTime" label="Startzeit">
      <b-input
        v-cleave="masks.time"
        :value="form.startTime"
        placeholder="HH:MM"
        @input.native="updateStartTime"
      />
    </form-group>

    <form-group :validator="$v.form.endTime" label="Endzeit">
      <b-input
        v-cleave="masks.time"
        :value="form.endTime"
        placeholder="HH:MM"
        @input.native="updateEndTime"
      />
    </form-group>

    <div class="actions">
      <b-button class="next" :disabled="$v.$invalid" @click="submit">
        Weiter
      </b-button>
    </div>

    <div class="info-box mt-6">
      <div class="title is-3 has-text-centered">
        Trainings-Slots Ergometer
      </div>
      <table class="table" style="width: 100%;">
        <thead>
          <tr>
            <th>Mo - Fr</th>
            <th>Sa + So</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>17:30 - 19:00</td>
            <td>06:00 - 07:30</td>
          </tr>
          <tr>
            <td>19:00 - 20:30</td>
            <td>07:30 - 09:00</td>
          </tr>
          <tr>
            <td>20:30 - 22:00</td>
            <td>09:00 - 10:30</td>
          </tr>
          <tr>
            <td>---</td>
            <td>10:30 - 12:00</td>
          </tr>
          <tr>
            <td>---</td>
            <td>12:00 - 13:30</td>
          </tr>
          <tr>
            <td>---</td>
            <td>13:30 - 15:00</td>
          </tr>
          <tr>
            <td>---</td>
            <td>15:00 - 16:30</td>
          </tr>
          <tr>
            <td>---</td>
            <td>16:30 - 18:00</td>
          </tr>
          <tr>
            <td>---</td>
            <td>18:00 - 19:30</td>
          </tr>
          <tr>
            <td>---</td>
            <td>19:30 - 21:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import cleave from '@/libs/cleave';
import {
  time,
  timeLater,
  futureDate,
  futureTime,
  timeBetween,
} from '@/libs/vuelidate';
import { dateFormat, prettyDateFormat, moment } from '@/libs/momentUtils';

export default {
  name: 'BookingCreateDate',

  directives: { cleave },

  data() {
    return {
      form: {
        date: null,
        startTime: null,
        endTime: null,
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
    form: {
      date: {
        required,
        futureDate,
      },
      startTime: {
        required,
        time,
        futureTime: futureTime('date'),
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
    ...mapGetters('rental', [
      'isTrainer',
    ]),
    minDate() {
      return moment().subtract(1, 'days').toDate();
    },
    maxDate() {
      // TODO: isTrainer
      if (this.isTrainer) {
        return moment().add(3 * 7, 'days').toDate(); // 3 weeks
      }

      return moment().add(7, 'days').toDate();
    },
    selectedDate() {
      return moment(this.form.date, dateFormat).toDate();
    },
  },

  mounted() {
    if (this.$route.hash) {
      // hash without #
      this.$set(this.form, 'date', this.$route.hash.substr(1));
    } else {
      // today
      this.$set(this.form, 'date', moment().format(dateFormat));
    }
  },

  methods: {
    dateFormatter(date) {
      return moment(date).format(prettyDateFormat);
    },
    updateDate(date) {
      this.$set(this.form, 'date', moment(date).format(dateFormat));
      this.$v.form.date.$touch();
    },
    updateStartTime({ target }) {
      this.$set(this.form, 'startTime', target._vCleave.getFormattedValue());
      this.$v.form.startTime.$touch();
    },
    updateEndTime({ target }) {
      this.$set(this.form, 'endTime', target._vCleave.getFormattedValue());
      this.$v.form.endTime.$touch();
    },
    submit() {
      this.$emit('done', this.form);
    },
  },
};
</script>
