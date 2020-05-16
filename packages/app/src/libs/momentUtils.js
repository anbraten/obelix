import Moment from 'moment';
import { extendMoment } from 'moment-range';

export const moment = extendMoment(Moment);

export const dateFormat = 'YYYY-MM-DD';
export const prettyDateFormat = 'DD.MM.YYYY';
export const timeFormat = 'HH:mm';
export const dateTimeFormat = `${dateFormat} ${timeFormat}`;

export function diffFromToday(date, checkOn = 'hours') {
  return moment().diff(date, checkOn);
}

export function isToday(date) {
  return diffFromToday(date, 'days') === 0;
}

export function isFutureDate(date, checkOn) {
  return diffFromToday(date, checkOn) < 0;
}

export function isPastDate(date, checkOn) {
  return !isFutureDate(date, checkOn);
}

export function isValidDate(date, format = dateFormat) {
  return moment(date, format, true).isValid();
}

export function timeRange(startTime, endTime, format = timeFormat) {
  return moment.range(moment(startTime, format), moment(endTime, format));
}
