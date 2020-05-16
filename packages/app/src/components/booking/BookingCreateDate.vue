<template>
  <div class="step">
    <form-group :validator="$v.form.date" v-if="form.date" label="Datum">
      <b-datepicker
        :value="selectedDate"
        @input="updateDate"
        :date-formatter="dateFormatter"
        :min-date="minDate"
        :max-date="maxDate" />
    </form-group>

    <form-group :validator="$v.form.startTime" label="Startzeit">
      <b-input
        v-cleave="masks.time"
        :value="form.startTime"
        @input.native="updateStartTime"
        placeholder="HH:MM" />
    </form-group>

    <form-group :validator="$v.form.endTime" label="Endzeit">
      <b-input
        v-cleave="masks.time"
        :value="form.endTime"
        @input.native="updateEndTime"
        placeholder="HH:MM" />
    </form-group>

    <div class="actions">
      <b-button class="next" @click="submit" :disabled="$v.$invalid">Weiter</b-button>
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

<style>

</style>
