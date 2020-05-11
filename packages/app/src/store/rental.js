import Vue from 'vue';
import Api from '@/libs/api';

export default {
  namespaced: true,

  state: {
    categories: null,
    bookings: {},
    rentables: null,
    user: null,
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
    setUser(state, user) {
      state.user = user;
    },
  },

  getters: {
    memberOf: (state) => (...groups) => {
      if (!state.user || !state.user.groups) {
        return false;
      }

      // check if user is member of one of the provided groups
      return groups.some((g) => state.user.groups.includes(g));
    },
    isTrainer: (state, getters) => getters.memberOf('trainer', 'admin'), // admins are trainers as well
    isAdmin: (state, getters) => getters.memberOf('admin'),
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

    updateRentable(context, rentable) {
      return new Promise((resolve, reject) => {
        Api.once('updateRentable', (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        });

        Api.emit('updateRentable', rentable);
      });
    },

    getUser({ commit }) {
      Api.once('getUser', (result) => {
        commit('setUser', result);
      });

      Api.emit('getUser');
    },
  },
};
