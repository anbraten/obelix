import Vue from 'vue';
import vuelidate from 'vuelidate';
import { helpers } from 'vuelidate/lib/validators';
import vuelidateErrorExtractor from 'vuelidate-error-extractor';

import ValidationField from '@/components/ValidationField.vue';
import moment from 'moment';

Vue.use(vuelidate);
Vue.use(vuelidateErrorExtractor, {
  template: ValidationField,
  messages: {
    time: '{attribute} muss im 24-Stundenformat angegeben sein. Bsp: 17:45',
    timeLater: '{attribute} muss später als {earlier} sein.',
  },
});

export const timeLater = (earlier) => helpers.withParams({ type: 'timeLater', earlier }, (value, parentVm) => {
  const earlierValue = helpers.ref(earlier, this, parentVm);
  return value >= earlierValue;
});

export const futureDate = (value) => {
  const date = moment(value);
  const diff = moment().diff(date, 'days');
  return diff <= 0;
};

export const time = helpers.regex('time', /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
