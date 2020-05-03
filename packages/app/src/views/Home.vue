<template>
  <div class="home">
    <div class="title">Herzlich Willkommen bei Obelix.</div>

    <!--
    <div class="categories">
      <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
    </div>
    -->

    <div class="head">

    </div>

    <BookingsList />
  </div>
</template>

<script>
// import CategoryCard from '@/components/CategoryCard.vue';
import BookingsList from '@/components/BookingsList.vue';

export default {
  name: 'Home',

  components: {
    // CategoryCard,
    BookingsList,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;
}

.title {
  font-size: 1.5rem;
}
</style>
