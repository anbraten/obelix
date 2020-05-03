<template>
  <div class="category button">

    <span>{{ category.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',

  props: {
    category: {
      type: Object,
      requrired: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
}
</style>
