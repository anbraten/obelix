<template>
  <div class="step">
    <div class="step-title">Wähle einen Boots-Typen aus.</div>

    <div class="categories">
      <template v-if="categories">
        <div v-for="category in categories" :key="category.id" @click="$emit('done', category)" class="category">
          <span>{{ category.name }}</span>
        </div>
      </template>

      <div v-if="isTrainer" @click="$emit('done', 'training')" class="category">
        <span>Training</span>
      </div>
    </div>

    <div class="actions">
      <b-button class="next" @click="$emit('back')">Zurück</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'BookingCreateCategory',

  computed: {
    ...mapGetters('rental', [
      'isTrainer',
    ]),
    ...mapState('rental', [
      'categories',
    ]),
  },

  mounted() {
    this.$store.dispatch('rental/getCategories');
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;

  .category {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 1rem;
    border-radius: .5rem;
    margin: 1rem;
    width: calc(50% - 2rem);
    cursor: pointer;
    background-color: white;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    max-width: 100%;

    &:hover {
      background: #eee;
    }

    .icon {
      margin-bottom: 1rem;
    }
  }
}
</style>
