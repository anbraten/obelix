<template>
  <div class="step">
    <div class="step-title">
      Erstelle ein neues Training
    </div>

    <template v-if="rentables">
      <b-field label="Boote auswählen">
        <b-taginput
          v-model="selectedRentables"
          :data="filteredRentables"
          autocomplete
          field="name"
          icon="ship"
          :before-adding="beforeAddingRentable"
          placeholder="Boot hinzufügen"
          @typing="getFilteredRentables"
        />
      </b-field>
    </template>

    <div class="actions">
      <b-button class="next" @click="$emit('back')">
        Zurück
      </b-button>
      <b-button class="next" :disabled="selectedRentables.length < 1" @click="submit">
        Weiter
      </b-button>
    </div>
  </div>
</template>

<script>
import { timeRange } from '@/libs/momentUtils';

export default {
  name: 'BookingCreateTraining',

  props: {
    booking: {
      validator: (booking) => booking instanceof Object || booking === null,
      required: true,
    },
  },

  data() {
    return {
      selectedRentables: [],
      filteredRentables: [],
    };
  },

  computed: {
    bookedRentables() {
      if (!this.booking) {
        return [];
      }

      let bookings = this.$store.state.rental.bookings[this.booking.date] || [];

      // start & end time
      const newBookingRange = timeRange(this.booking.startTime, this.booking.endTime);

      bookings = bookings
        .filter((booking) => {
          const bookingRange = timeRange(booking.startTime, booking.endTime);
          return newBookingRange.overlaps(bookingRange);
        })
        .reduce((total, booking) => [...total, ...booking.rentables], []);

      return bookings;
    },
    categories() {
      return this.$store.state.rental.categories || [];
    },
    rentables() {
      let rentables = this.$store.state.rental.rentables || [];

      rentables = rentables.map((rentable) => {
        let canBook = true;

        if (this.bookedRentables.includes(rentable.id)) {
          canBook = false;
        }

        const category = this.categories.find((c) => c.id === rentable.category);

        return {
          ...rentable,
          category,
          canBook,
        };
      });

      return rentables;
    },
  },

  methods: {
    getFilteredRentables(text) {
      this.filteredRentables = this.rentables.filter((option) => option.name
        .toString()
        .toLowerCase()
        .indexOf(text.toLowerCase()) >= 0);
    },
    beforeAddingRentable(rentable) {
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
        return false;
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
            this.selectedRentables.push(rentable);
          },
        });
        return false;
      }

      return true;
    },
    submit() {
      const rentables = this.selectedRentables.map((rentable) => rentable.id);
      this.$emit('done', rentables);
    },
  },
};
</script>

<style lang="scss" scoped>
.rentable {
  display: flex;
  padding: .5rem 1rem;
  flex-flow: row;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100, 121, 143, .122);
  text-align: left;
  cursor: pointer;
  align-content: center;

  &:hover {
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    z-index: 1;
  }

  .info {
    margin-left: auto;
  }
}

::v-deep tr {
  cursor: pointer;

  &:hover {
    background: #ccc;
  }

  .check {
    cursor: pointer;
  }

  &.booked {
    background: hsl(348, 80%, 61%);

    &:hover {
      background: hsl(348, 40%, 61%);
    }
  }
}
</style>
