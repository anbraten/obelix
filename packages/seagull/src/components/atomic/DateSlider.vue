<template>
  <div class="flex flex-col w-full">
    <div class="bg-primary text-white p-1 text-center">{{ selectedDate.format('MMMM YYYY') }}</div>

    <div class="flex justify-between px-4 py-2">
      <div
        v-for="day in days"
        :key="day._id"
        class=" flex flex-col items-center cursor-pointer"
        @click="selectDate(day.day)"
      >
        <span>{{ day.label }}</span>
        <span
          class="rounded-full p-2"
          :class="{ 'bg-primary text-white': day._id === selectedDate.valueOf() }"
        >
          <template v-if="day.day.date() === 1">{{ day.day.format('DD.MM') }}</template>
          <template v-else>{{ day.day.format('DD') }}</template>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue';

export default defineComponent({
  name: 'DateSlider',

  props: {
    selectedDate: {
      type: Object as PropType<any>,
      required: true,
    },
  },

  emits: {
    'update:selected-date': () => true,
  },

  setup(props, { emit }) {
    const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    const getDay = (day) => {
      return {
        _id: day.valueOf(),
        label: dayNames[day.day()],
        day,
      };
    };

    const days = computed(() => {
      return [
        getDay(props.selectedDate.subtract(3, 'day')),
        getDay(props.selectedDate.subtract(2, 'day')),
        getDay(props.selectedDate.subtract(1, 'day')),
        getDay(props.selectedDate),
        getDay(props.selectedDate.add(1, 'day')),
        getDay(props.selectedDate.add(2, 'day')),
        getDay(props.selectedDate.add(3, 'day')),
      ];
    });

    const selectDate = (day) => {
      emit('update:selected-date', day);
    };

    return {
      days,
      selectDate,
    };
  },
});
</script>
