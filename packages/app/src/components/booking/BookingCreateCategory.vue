<template>
  <div class="step">
    <div class="step-title">Wähle einen Boots-Typen aus.</div>

    <template v-if="categories">
      <div v-for="category in categories" :key="category.id" @click="selectCategory(category)" class="rentable">
        <span>{{ category.name }}</span>
      </div>
    </template>

    <div class="actions">
      <b-button class="next" @click="$emit('back')">Zurück</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BookingCreateCategory',

  computed: {
    ...mapState('rental', [
      'categories',
    ]),
  },

  mounted() {
    this.$store.dispatch('rental/getCategories');
  },

  methods: {
    selectCategory(category) {
      this.$emit('done', category);
    },
  },
};
</script>
