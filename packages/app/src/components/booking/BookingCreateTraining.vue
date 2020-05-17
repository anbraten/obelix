<template>
  <div class="step">
    <div class="step-title">Erstelle ein neues Training</div>

    <template v-if="rentables">
      <b-table
        :data="rentables"
        :default-sort="['name', 'asc']"
        :paginated="true"
        :per-page="10"
        :row-class="(row, index) => !row.canBook && 'booked'"
        @click="selectRentable" >
        <template slot-scope="props">
          <b-table-column>
            <b-checkbox class="check" v-if="props.row.canBook" :value="selectedRentables.includes(props.row.id)" disabled />
          </b-table-column>

          <b-table-column field="name" label="Name" sortable>
            <span>{{ props.row.name }}</span>
          </b-table-column>

          <b-table-column field="category.name" label="Boots-Typ" sortable>
            <span v-if="props.row.category">{{ props.row.category.name || '' }}</span>
          </b-table-column>

          <b-table-column field="bookingInfo" label="Informationen" sortable>
            <span v-if="props.row.bookingInfo">
              <b-icon pack="fas" icon="info" size="is-small" />
              {{ props.row.bookingInfo }}
            </span>
          </b-table-column>
        </template>
      </b-table>
    </template>

    <div class="actions">
      <b-button class="next" @click="$emit('back')">Zurück</b-button>
      <b-button class="next" @click="submit" :disabled="selectedRentables.length < 1">Weiter</b-button>
    </div>
  </div>
</template>

<script>
import { timeRange } from '@/libs/momentUtils';

export default {
  name: 'BookingCreateTraining',

  props: {
    booking: {
      required: true,
    },
  },

  data() {
    return {
      selectedRentables: [],
    };
  },

  computed: {
    bookedRentables() {
      let bookings = this.$store.state.rental.bookings[this.booking.date] || [];

      // start & end time
      const newBookingRange = timeRange(this.booking.startTime, this.booking.endTime);

      bookings = bookings.filter((booking) => {
        const bookingRange = timeRange(booking.startTime, booking.endTime);
        return newBookingRange.overlaps(bookingRange);
      });

      const bookedRentables = bookings.reduce((total, booking) => {
        // old dataset // TODO: remove
        if (booking.rentable) {
          return [...total, booking.rentable.id];
        }

        const rentables = booking.rentables.map((rentable) => rentable.id);
        return [...total, ...rentables];
      }, []);

      return bookedRentables;
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
    selectRentable(rentable) {
      // if already selected => unselect
      if (this.selectedRentables.includes(rentable.id)) {
        this.selectedRentables = this.selectedRentables.filter((r) => r !== rentable.id);
        return;
      }

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
            this.selectedRentables.push(rentable.id);
          },
        });
        return;
      }

      this.selectedRentables.push(rentable.id);
    },
    submit() {
      this.$emit('done', this.selectedRentables);
    },
  },
};
</script>

<style lang="scss" scoped>
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
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
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
