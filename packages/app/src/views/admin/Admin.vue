<template>
  <div class="page">
    <div class="head">
      <div class="head-title">Admin</div>
    </div>

    <div class="cards">
      <div class="card" @click="$router.push({ name: 'admin-categories' })">
        <b-icon class="icon" pack="fas" icon="grip-horizontal" size="is-big" />
        <span>Boots-Typen</span>
      </div>

      <div class="card" @click="$router.push({ name: 'admin-rentables' })">
        <b-icon class="icon" pack="fas" icon="ship" size="is-big" />
        <span>Boote</span>
      </div>

      <div class="card" @click="$router.push({ name: 'admin-users' })">
        <b-icon class="icon" pack="fas" icon="users" size="is-big" />
        <span>Benutzer</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
};
</script>

<style lang="scss" scoped>

.page {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  max-width: 40rem;
  padding: 1rem 0;

  .head {
    margin-bottom: 2rem;

    .head-title {
      font-size: 2rem;
      display: flex;
      justify-content: center;
    }
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;

  .card {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 1rem;
    border-radius: .5rem;
    margin: 1rem;
    width: calc(50% - 2rem);
    cursor: pointer;

    &:hover {
      background: #eee;
    }

    .icon {
      margin-bottom: 1rem;
    }
  }
}
</style>
