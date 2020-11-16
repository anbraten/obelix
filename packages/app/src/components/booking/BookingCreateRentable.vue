<template>
  <div class="step">
    <div class="step-title">
      Wähle ein Boot aus.
    </div>

    <template v-if="rentables">
      <template v-for="rentable in rentables">
        <div :key="rentable.id" class="rentable" :class="rentable.canBook ? '' : 'booked'" @click="selectRentable(rentable)">
          <span class="name"><b-icon pack="fas" icon="ship" size="is-small" /> {{ rentable.name }}</span>
          <span v-if="rentable.bookingInfo" class="info"><b-icon pack="fas" icon="info" size="is-small" /> {{ rentable.bookingInfo }}</span>
        </div>
      </template>
    </template>

    <div class="actions">
      <b-button class="next" @click="$emit('back')">
        Zurück
      </b-button>
    </div>
  </div>
</template>

<script>
import { timeRange } from '@/libs/momentUtils';

export default {
  name: 'BookingCreateRentable',

  props: {
    booking: {
      validator: (booking) => booking instanceof Object || booking === null,
      required: true,
    },
    category: {
      validator: (category) => category instanceof Object || category instanceof String || category === null,
      required: true,
    },
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
    rentables() {
      if (!this.category) {
        return null;
      }

      let rentables = this.$store.state.rental.rentables || [];
      rentables = rentables.filter((rentable) => rentable.category === this.category.id);

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
  },

  methods: {
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
            this.$emit('done', rentable);
          },
        });
        return;
      }

      this.$emit('done', rentable);
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

  &.booked {
    background: hsl(348, 80%, 61%);
  }

  .info {
    margin-left: auto;
  }
}
</style>
