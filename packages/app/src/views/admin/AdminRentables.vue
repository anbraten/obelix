<template>
  <div class="page">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Boote verwalten</div>
      <div class="button" @click="$router.push({ name: 'admin-create-rentable' })">Neues Boot anlegen</div>
    </div>

    <div v-if="rentables" class="rentables">
      <div v-for="rentable in rentables" :key="rentable.id" @click="selectRentable(rentable)" class="rentable">
        <span>{{ rentable.name }}</span>
        <!-- <div class="remove" @click="removeRentable(rentable)"><i class="fas fa-trash" /></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminRentables',

  computed: {
    rentables() {
      return this.$store.state.rental.rentables;
    },
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      await this.$store.dispatch('rental/getRentables');
    },
    selectRentable(rentable) {
      this.$router.push({ name: 'admin-rentable', params: { rentableId: rentable.id } });
    },
  },
  async removeRentable(rentable) {
    // TODO: implement removeRentable in store & backend
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
