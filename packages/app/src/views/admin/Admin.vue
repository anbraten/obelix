<template>
  <div class="page">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Boots-Typen verwalten</div>
      <div />
    </div>

    <template v-if="categories">
      <div v-for="category in categories" :key="category.id" @click="selectCategory(category)" class="rentable">
        <span>{{ category.name }}</span>
        <div class="remove" @click="removeCategory(category)"><i class="fas fa-trash" /></div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Admin',

  computed: {
    ...mapState('rental', [
      'categories',
    ]),
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      await this.$store.dispatch('rental/getCategories');
    },
    selectCategory(category) {
      this.$router.push({ name: 'admin-category', params: { category: category.id } });
    },
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
