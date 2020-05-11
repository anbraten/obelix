<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ user.name }}</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Email" horizontal>
        <b-input type="email" :value="user.email" placeholder="Your email" disabled />
      </b-field>

      <b-field label="Gruppe" horizontal>
        <b-radio-button :value="user.group || ''" native-value="" @input="$emit('group', '')">Standard</b-radio-button>
        <b-radio-button :value="user.group" native-value="trainer" @input="$emit('group', 'trainer')">Trainer</b-radio-button>
        <b-radio-button :value="user.group" native-value="admin" @input="$emit('group', 'admin')">Admin</b-radio-button>
      </b-field>
    </section>
    <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UserForm',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
