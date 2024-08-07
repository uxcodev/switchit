<template>
  <div class="inline-flex items-center gap-2.5 cursor-pointer" @click.stop="handleClick">
    <div
      :class="[
        'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-1 border',
        value ? 'border-primary bg-primary' : 'border-shade-33 bg-transparent',
      ]"
    >
      <CheckIcon v-if="value" class="h-3 w-3 text-white" />
    </div>

    <span v-if="label" class="text-xsm text-black pt-0.5">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CheckIcon from '@/components/basic/icons/CheckIcon.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});

const handleClick = () => {
  value.value = !value.value;
}
</script>
