<template>
  <div class="page">
    <div class="head">
      <div class="button" @click="$router.go(-1)">
        <i class="fas fa-angle-double-left" />
      </div>
      <div v-if="isCreate" class="head-title">
        Boot anlegen
      </div>
      <div v-else class="head-title">
        Boot verwalten
      </div>
      <div />
    </div>

    <div class="rentable">
      <form-group :validator="$v.form.name" label="Name">
        <b-input v-model.trim="$v.form.name.$model" placeholder="Name" />
      </form-group>

      <form-group :validator="$v.form.category" label="Boots-Typ">
        <b-select v-model="$v.form.category.$model" placeholder="Boots-Typ auswählen ...">
          <option v-for="option in categories" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </b-select>
      </form-group>

      <b-field label="Reservierungs Info" grouped group-multiline>
        <p class="control description">
          <b-icon pack="fas" icon="info" size="is-small" />
          <span>Diese Information wird in der Boots-Liste beim Reservieren angezeigt.</span>
        </p>
        <b-input v-model="form.bookingInfo" maxlength="50" expanded placeholder="Bsp: Genehmigung erforderlich" />
      </b-field>

      <b-field label="Reservierungs Warnung" grouped group-multiline>
        <p class="control description">
          <b-icon pack="fas" icon="info" size="is-small" />
          <span>Diese Warnung muss bei der Reservierung dieses Bootes bestätigt werden.</span>
        </p>
        <b-input v-model="form.bookingAlert" maxlength="200" type="textarea" expanded placeholder="Bsp: Du benötigst zum Fahren dieses Bootes eine Genehmigung der Ruderwartin" />
      </b-field>

      <b-button v-if="isCreate" :disabled="$v.$invalid" @click="createRentable">
        Boot anlegen
      </b-button>
      <b-button v-else :disabled="$v.$invalid" @click="updateRentable">
        Boot speichern
      </b-button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AdminRentable',

  data() {
    return {
      form: {
        name: null,
        category: null,
        bookingInfo: null,
        bookingAlert: null,
      },
    };
  },

  validations: {
    form: {
      name: {
        required,
      },
      category: {
        required,
      },
    },
  },

  computed: {
    rentableId() {
      return this.$route.params.rentableId;
    },
    isCreate() {
      return this.$route.name === 'admin-create-rentable';
    },
    rentable() {
      if (this.isCreate) {
        return null;
      }

      const { rentables } = this.$store.state.rental;

      if (!rentables) {
        return null;
      }

      return rentables.find((r) => r.id === this.rentableId);
    },
    categories() {
      return this.$store.state.rental.categories;
    },
  },

  watch: {
    rentable(rentable) {
      this.form = {
        name: rentable.name,
        category: rentable.category,
        bookingInfo: rentable.bookingInfo,
        bookingAlert: rentable.bookingAlert,
      };
    },
  },

  async created() {
    await this.$store.dispatch('rental/getCategories');

    if (!this.isCreate) {
      await this.loadRentables();
    }
  },

  methods: {
    async loadRentables() {
      await this.$store.dispatch('rental/getRentables');
    },
    async createRentable() {
      const rentable = {
        ...this.form,
      };

      const r = await this.$store.dispatch('rental/createRentable', rentable);

      this.$buefy.toast.open({
        message: 'Das neue Boot wurde erfolgreich angelegt',
        type: 'is-success',
      });

      this.$router.replace({ name: 'admin-rentable', params: { rentableId: r.id } });
    },
    async updateRentable() {
      const rentable = {
        ...this.form,
        id: this.rentableId,
      };

      await this.$store.dispatch('rental/updateRentable', rentable);

      this.$buefy.toast.open({
        message: 'Das Boot wurde erfolgreich aktualisiert',
        type: 'is-success',
      });

      await this.loadRentables();
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
</style>
