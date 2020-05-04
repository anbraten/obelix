import Vue from 'vue';
import Api from '@/libs/api';

export default {
  namespaced: true,

  state: {
    categories: null,
    bookings: {},
    rentables: null,
  },

  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    addBookings(state, { date, bookings }) {
      Vue.set(state.bookings, date, bookings);
    },
    setRentables(state, rentables) {
      state.rentables = rentables;
    },
  },

  actions: {
    getCategories({ commit }) {
      Api.once('getCategories', (categories) => {
        commit('setCategories', categories);
      });

      Api.emit('getCategories');
    },

    getBookings({ commit }, selectedDate) {
      Api.once('getBookings', (bookingsOfDate) => {
        commit('addBookings', { date: selectedDate, bookings: bookingsOfDate });
      });

      Api.emit('getBookings', selectedDate);
    },

    getRentables({ commit }) {
      Api.once('getRentables', (bookings) => {
        commit('setRentables', bookings);
      });

      Api.emit('getRentables');
    },

    createBooking(context, booking) {
      return new Promise((resolve, reject) => {
        Api.once('createBooking', (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        });

        Api.emit('createBooking', booking);
      });
    },

    cancelBooking(context, booking) {
      return new Promise((resolve, reject) => {
        Api.once('cancelBooking', (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        });

        Api.emit('cancelBooking', booking);
      });
    },

    createRentable(context, rentable) {
      return new Promise((resolve, reject) => {
        Api.once('createRentable', (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        });

        Api.emit('createRentable', rentable);
      });
    },
  },
};
