<template>
  <div class="step">
    <template v-if="booking">
      <div v-if="isTraining" class="step-title">Du möchtest folgendes Training erstellen?</div>
      <div v-else class="step-title">Du möchtest folgende Reservierung aufgeben?</div>

      <b-field label="Datum">
        <span>{{ booking.date | date }}</span>
      </b-field>

      <b-field v-if="booking" label="Zeit">
        <span>{{ booking.startTime | time }} bis {{ booking.endTime | time }}</span>
      </b-field>

      <b-field :label="isTraining ? 'Boote' : 'Boot'">
        <ul>
          <li v-for="rentable in bookedRentables" :key="rentable.id">{{ rentable.name }}</li>
        </ul>
      </b-field>

      <b-field label="Bemerkung" grouped group-multiline>
        <div class="control description" style="flex-shrink: 1">
          <span><b-icon pack="fas" icon="info" size="is-small" /> Du kannst hier eine öffentliche Bemerkung zu deiner Reservierung hinterlegen.</span>
        </div>
        <b-input v-model="note" maxlength="100" type="textarea" expanded placeholder="Bsp: Ich werde wahrscheinlich Richtung Freudenholm fahren." />
      </b-field>

      <div class="actions">
        <b-button class="prev" @click="$emit('back')">Zurück</b-button>
        <b-button class="next" @click="createBooking">Reservieren</b-button>
      </div>
    </template>
  </div>
</template>

<script>
import { prettyDateFormat, timeFormat, moment } from '@/libs/momentUtils';

export default {
  name: 'CreateBookingFinish',

  data() {
    return {
      note: null,
    };
  },

  props: {
    booking: {
      required: true,
    },
  },

  computed: {
    rentables() {
      return this.$store.state.rental.rentables || [];
    },
    bookedRentables() {
      if (!this.booking.rentables) {
        return [];
      }

      return this.booking.rentables.map((r) => this.rentables.find((u) => r === u.id));
    },
    isTraining() {
      return this.bookedRentables.length > 1;
    },
  },

  methods: {
    createBooking() {
      const booking = {
        ...this.booking,
        note: this.note,
      };

      this.$emit('done', booking);
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
