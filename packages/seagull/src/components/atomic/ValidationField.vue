<template>
  <o-field :label="label" :variant="variant" :message="message">
    <slot />
  </o-field>
</template>

<script lang="ts">
import { Validation } from '@vuelidate/core';
import { computed, defineComponent, PropType, toRefs } from 'vue';

export default defineComponent({
  name: 'ValidationField',

  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },

    validation: {
      type: Object as PropType<Validation>,
      required: true,
    },
  },

  setup(props) {
    const validation = toRefs(props).validation;
    const message = computed(() => validation.value.$errors.map(v => v.$message).join('\n'));
    const variant = computed(() => (validation.value.$error ? 'danger' : ''));

    return { message, variant };
  },
});
</script>
