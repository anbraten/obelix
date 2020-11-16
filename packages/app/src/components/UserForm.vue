<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ user.name }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-field label="Email" horizontal>
        <b-input type="email" :value="user.email" placeholder="Your email" disabled />
      </b-field>

      <b-field label="Gruppe" horizontal>
        <b-radio-button :value="user.group || ''" native-value="" @input="$emit('group', '')">
          Standard
        </b-radio-button>
        <b-radio-button :value="user.group" native-value="trainer" @input="$emit('group', 'trainer')">
          Trainer
        </b-radio-button>
        <b-radio-button :value="user.group" native-value="admin" @input="$emit('group', 'admin')">
          Admin
        </b-radio-button>
      </b-field>

      <b-field label="Zugriff" horizontal>
        <b-radio-button type="is-success" :value="user.access || 'granted'" native-value="granted" @input="$emit('access', 'granted')">
          Freigegeben
        </b-radio-button>
        <b-radio-button type="is-danger" :value="user.access" native-value="denied" @input="$emit('access', 'denied')">
          Gesperrt
        </b-radio-button>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Schließen
      </button>
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
