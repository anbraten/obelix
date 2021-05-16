<template>
  <div class="flex flex-col p-4 h-full w-full max-w-lg m-auto">
    <div class="flex p-4 justify-center items-center w-full max-w-2xl px-4 md:mx-auto">
      <div class="px-2 cursor-pointer" @click="$router.back">
        <o-icon pack="fas" icon="times" />
      </div>
      <span class="mx-auto text-xl">Neues Boot erstellen</span>
    </div>

    <ValidationField :validation="v$.name" label="Name">
      <o-input v-model="bookable.name" placeholder="z.B. Seebär" @blur="v$.name.$touch" />
    </ValidationField>

    <ValidationField :validation="v$.tags" label="Tags">
      <Multiselect v-model="bookable.tags" mode="tags" :options="tagOptions" placeholder="Wähle Tags für dieses Boot" />
    </ValidationField>

    <o-button class="mt-auto" size="medium" :disabled="v$.$invalid" @click="save">Boot erstellen</o-button>
  </div>
</template>

<route lang="yaml">
name: bookable-create
meta:
  layout: default
</route>

<script lang="ts">
import Multiselect from '@vueform/multiselect';
import { useVuelidate } from '@vuelidate/core';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import tagOptions from '~/@types/tags';
import ValidationField from '~/components/atomic/ValidationField.vue';
import feathers from '~/compositions/useBackend';
import { required } from '~/libs/date';
import Bookable from '~/types/bookable';

export default defineComponent({
  name: 'Bookables',

  components: {
    ValidationField,
    Multiselect,
  },

  setup() {
    const router = useRouter();

    const bookable = ref<Partial<Bookable>>({
      name: '',
      tags: [],
    });

    const rules = {
      name: {
        required,
      },

      tags: {
        // required,
      },
    };

    const v$ = useVuelidate(rules, bookable);

    async function save() {
      await feathers.service('bookables').create(bookable.value);
      await router.replace({ name: 'bookables' });
    }

    return {
      tagOptions,
      bookable,
      v$,
      save,
    };
  },
});
</script>
