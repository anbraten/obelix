import Vue from 'vue';
import Api from '@/libs/api';

export default {
  namespaced: true,

  state: {
    categories: null,
    bookings: {},
    rentables: null,
    user: null,
    users: null,
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
    setUsers(state, users) {
      state.users = users;
    },
  },

  getters: {
    memberOf: (state) => (group) => state.user && state.user.group && state.user.group === group,
    isTrainer: (state, getters) => getters.memberOf('trainer') || getters.memberOf('admin'), // admins are trainers as well
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
            reject(new Error(result.error));
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
            reject(new Error(result.error));
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
            reject(new Error(result.error));
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
            reject(new Error(result.error));
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

    getUsers({ commit }) {
      Api.once('getUsers', (result) => {
        commit('setUsers', result);
      });

      Api.emit('getUsers');
    },

    removeUser(context, user) {
      return new Promise((resolve, reject) => {
        Api.once('removeUser', (result) => {
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        });

        Api.emit('removeUser', user);
      });
    },

    updateUser(context, user) {
      return new Promise((resolve, reject) => {
        Api.once('updateUser', (result) => {
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        });

        Api.emit('updateUser', user);
      });
    },
  },
};
