<template>
  <div>
    <p v-if="label" class="mb-1.5">
      {{ label }}
    </p>

    <div class="">
      <input
        v-model="value"
        :class="[
          'w-full rounded-1.5 border-none outline-none bg-shade-f5  h-12 p-4'
        ]"
        :placeholder="placeholder"
      />
    </div>

    <p v-if="error" class="text-red-600 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: null,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue']);

const focused = ref(false);

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});
</script>
