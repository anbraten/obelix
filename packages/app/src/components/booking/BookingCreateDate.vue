<template>
  <div class="flex flex-col">
    <ValidationField :validation="v$.date" label="Datum">
      <o-datepicker
        v-model="v$.date.$model"
        :date-formatter="dateFormatter"
        :min-date="minDate"
        :max-date="maxDate"
        :mobile-native="false"
        @blur="v$.date.$touch"
      />
    </ValidationField>

    <ValidationField :validation="v$.startTime" label="Startzeit">
      <o-input v-model="v$.startTime.$model" v-cleave="masks.time" placeholder="HH:MM" @blur="v$.startTime.$touch" />
    </ValidationField>

    <ValidationField :validation="v$.endTime" label="Endzeit">
      <o-input v-model="v$.endTime.$model" v-cleave="masks.time" placeholder="HH:MM" @blur="v$.endTime.$touch" />
    </ValidationField>
  </div>
</template>

<script lang="ts">
// import cleave from '@/libs/cleave';
// import { dateFormat, prettyDateFormat, moment } from '@/libs/momentUtils';
import { useVuelidate } from '@vuelidate/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { computed, defineComponent, PropType, reactive, ref, toRef, watch } from 'vue';

import ValidationField from '~/components/atomic/ValidationField.vue';
import cleave from '~/libs/cleave';
import { futureDate, futureTime, required, timeBetween, timeLater, validDate, validTime } from '~/libs/date';
import Booking from '~/types/booking';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'BookingCreateDate',

  components: {
    ValidationField,
  },

  directives: {
    cleave,
  },

  props: {
    booking: {
      type: Object as PropType<Partial<Booking>>,
      required: true,
    },
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:booking': (__booking: Partial<Booking>) => true,
  },

  setup(props, { emit }) {
    const bookingProp = toRef(props, 'booking');
    const booking = computed(() => ({
      ...bookingProp.value,
      startDate: props.booking.startDate || new Date(),
      endDate: props.booking.endDate || new Date(),
    }));

    // TODO
    const isTrainer = ref(false);

    const form = reactive<{ date: Date; startTime: string; endTime: string }>({
      date: booking.value.startDate,
      startTime: '',
      endTime: '',
    });

    const rules = {
      date: {
        required,
        validDate,
        futureDate,
      },

      startTime: {
        required,
        validTime,
        // futureTime: futureTime('date'),
      },

      endTime: {
        required,
        validTime,
        // timeBetween: timeBetween('startTime', 1, 4), // min 1 hours, max 4 hours
        timeLater: timeLater(toRef(form, 'startTime')),
      },
    };

    const v$ = useVuelidate(rules, form);

    const combineDateTime = (date: Date, time: string) => {
      return dayjs(`${dayjs(date).format('DD.MM.YYYY')} ${time}`, 'DD.MM.YYYY HH:mm').toDate();
    };

    const minDate = dayjs().subtract(1, 'days').toDate();

    const maxDate = computed(() => {
      if (isTrainer.value) {
        return dayjs()
          .add(3 * 7, 'days')
          .toDate(); // 3 weeks
      }

      return dayjs().add(7, 'days').toDate();
    });

    const dateFormatter = (date: Date) => {
      return dayjs(date).format('DD.MM.YYYY');
    };

    const masks = {
      time: {
        time: true,
        timePattern: ['h', 'm'],
      },
    };

    watch(
      () => v$.value.$invalid,
      (invalid) => {
        if (invalid) {
          return;
        }

        emit('update:booking', {
          ...booking.value,
          startDate: combineDateTime(form.date, form.startTime),
          endDate: combineDateTime(form.date, form.endTime),
        });
      },
    );

    return { v$, minDate, maxDate, dateFormatter, masks };
  },
});
</script>
