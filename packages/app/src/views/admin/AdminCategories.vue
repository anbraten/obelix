<template>
  <div class="page">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Boots-Typen verwalten</div>
      <div />
    </div>

    <div v-if="categories" class="categories">
      <div v-for="category in categories" :key="category.id" @click="selectCategory(category)" class="category">
        <span>{{ category.name }}</span>
        <!--<div class="remove" @click="removeCategory(category)"><i class="fas fa-trash" /></div>-->
      </div>
    </div>

    <!--<div class="new-category">
      <div class="">Neuer Boots-Typ</div>
      TODO
    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminCategories',

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
    selectCategory(/* category */) {
      // this.$router.push({ name: 'admin-category', params: { category: category.id } });
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

.category {
  display: flex;
  padding: 0.5rem 1rem;
  flex-flow: row;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(100,121,143,0.122);
  text-align: left;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    z-index: 1;
  }

  .remove {
    margin-left: auto;
  }
}

.new-category {
  margin-top: 2rem;
}
</style>
