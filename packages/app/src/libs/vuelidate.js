import Vue from 'vue';
import vuelidate from 'vuelidate';
import { helpers } from 'vuelidate/lib/validators';
import vuelidateErrorExtractor from 'vuelidate-error-extractor';

import ValidationField from '@/components/ValidationField.vue';
import moment from 'moment';

import {
  dateTimeFormat,
  timeFormat,
} from '@/libs/momentUtils';

Vue.use(vuelidate);
Vue.use(vuelidateErrorExtractor, {
  template: ValidationField,
  messages: {
    required: '{attribute} muss angegeben werden.',
    time: '{attribute} muss im 24-Stundenformat angegeben sein. Bsp: 17:45',
    timeLater: '{attribute} muss später als {earlier} sein.',
    timeBetween: '{attribute} muss mindestens {min} und maximal {max} Stunden nach {start} sein.',
    futureTime: '{attribute} muss in der Zukunft liegen.',
    futureDate: '{attribute} muss in der Zukunft liegen.',
  },
});

export const timeLater = (earlier) => helpers.withParams({ type: 'timeLater', earlier }, (value, parentVm) => {
  const earlierValue = helpers.ref(earlier, this, parentVm);
  return value >= earlierValue;
});

export const timeBetween = (start, min, max) => helpers.withParams({
  type: 'timeBetween',
  start,
  min,
  max,
}, (endValue, parentVm) => {
  const startValue = helpers.ref(start, this, parentVm);

  if (!helpers.req(endValue) || !helpers.req(startValue)) {
    return true;
  }

  const startDate = moment(startValue, timeFormat);
  const endDate = moment(endValue, timeFormat);
  const duration = moment.duration(endDate.diff(startDate)).asHours();
  return duration >= min && duration <= max;
});

export const futureDate = (value) => {
  const date = moment(value);
  const diff = moment().diff(date, 'days');
  return diff <= 0;
};

export const futureTime = (date) => helpers.withParams({ type: 'futureTime', date }, (time, parentVm) => {
  const dateValue = moment(`${helpers.ref(date, this, parentVm)} ${time}`, dateTimeFormat);
  return moment().diff(dateValue, 'minutes') < 0;
});

export const time = helpers.regex('time', /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
