<template>
  <b-field :label="label" :type="type" :message="firstErrorMessage">
    <slot/>
  </b-field>
</template>
<script>
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';

export default {
  extends: singleErrorExtractorMixin,

  computed: {
    type() {
      if (this.hasErrors) {
        return 'is-danger';
      }

      return null;
    },
  },
};
</script>
