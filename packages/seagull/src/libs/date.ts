import { ValidationRuleWithParams, ValidatorFn } from '@vuelidate/core';
import { helpers, required as vulidateRequired } from '@vuelidate/validators';
import dayjs from 'dayjs';
import { Ref } from 'vue';

export const required = helpers.withMessage('Das Feld muss ausgefüllt werden.', vulidateRequired);

export const timeLater = (earlier: Ref<string>): ValidationRuleWithParams =>
  helpers.withMessage('Die Zeit muss später sein.', (value: unknown): boolean => {
    return parseInt(value as string) >= parseInt(earlier.value);
  });

export const timeBetween = (start: string, min: number, max: number) =>
  helpers.withParams(
    {
      type: 'timeBetween',
      start,
      min,
      max,
    },
    (endValue, parentVm) => {
      const startValue = helpers.ref(start, this, parentVm);

      if (!helpers.req(endValue) || !helpers.req(startValue)) {
        return true;
      }

      const startDate = dayjs(startValue, timeFormat);
      const endDate = dayjs(endValue, timeFormat);
      const duration = dayjs.duration(endDate.diff(startDate)).asHours();
      return duration >= min && duration <= max;
    },
  );

export const futureDate = helpers.withMessage('', (value: unknown): boolean => {
  const date = dayjs(value as string);
  const diff = dayjs().diff(date, 'days');
  return diff <= 0;
});

export const futureTime = (date: string) =>
  helpers.withParams({ type: 'futureTime', date }, (time: string, parentVm) => {
    const dateValue = dayjs(`${helpers.ref(date, this, parentVm)} ${time}`, dateTimeFormat);
    return dayjs().diff(dateValue, 'minutes') < 0;
  });

export const validTime = helpers.withMessage(
  'Die Zeit muss im 24-Stundenformat angegeben sein. Bsp: 17:45',
  helpers.regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
);

export const validDate = helpers.withMessage(
  'Das Datum muss in Format DD.MM.YYYY sein. Bsp: 01.04.2021',
  (value: unknown) => dayjs(value as string).isValid(),
);
