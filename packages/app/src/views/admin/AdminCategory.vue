<template>
  <div class="page">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Boote verwalten</div>
      <div />
    </div>

    <template v-if="rentables">
      <div v-for="rentable in rentables" :key="rentable.id" class="rentable">
        <span>{{ rentable.name }}</span>
        <div class="remove" @click="removeRentable(rentable)"><i class="fas fa-trash" /></div>
      </div>
    </template>

    <div class="new-rentable">
      <b-field label="Name">
        <b-input v-model="rentable.name" required />
      </b-field>
      <b-field label="Bemerkungen">
        <b-input v-model="rentable.note" maxlength="200" type="textarea" required />
      </b-field>
      <b-button @click="createRentable">Boot anlegen</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCategory',

  data() {
    return {
      rentable: {
        name: null,
        note: null,
      },
    };
  },

  computed: {
    category() {
      return this.$route.params.category;
    },
    rentables() {
      const { rentables } = this.$store.state.rental;

      if (!this.category || !rentables) {
        return null;
      }

      return rentables.filter((rentable) => rentable.category === this.category);
    },
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      await this.$store.dispatch('rental/getRentables');
    },
    async createRentable() {
      const rentable = {
        ...this.rentable,
        category: this.category,
      };

      this.rentable = {
        name: null,
        note: null,
      };

      await this.$store.dispatch('rental/createRentable', rentable);

      this.$buefy.toast.open({
        message: 'Das neue Boot wurde erfolgreich angelegt',
        type: 'is-success',
      });

      await this.loadData();
    },
  },
  async removeRentable(rentable) {
    await this.$store.dispatch('rental/removeRentable', rentable);
    await this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 .5rem;

    .head-title {
      font-size: 1.5rem;
    }
  }
}

.new-rentable {
  margin-top: 2rem;
  padding: 0.5rem;
}

.rentable {
  display: flex;
  padding: 0.5rem 1rem;
  flex-flow: row;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100,121,143,0.122);
  text-align: left;
  cursor: pointer;

  &:hover {
    -webkit-box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    z-index: 1;
  }

  .remove {
    margin-left: auto;
  }
}
</style>
