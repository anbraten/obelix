<template>
  <div class="page">
    <div class="head">
      <div @click="$router.go(-1)" class="button"><i class="fas fa-angle-double-left" /></div>
      <div class="head-title">Benutzer verwalten</div>
      <div />
    </div>

    TODO
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
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
</style>
