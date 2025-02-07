<template>
  <div class="relative">
    <p v-if="label" class="mb-1.5">
      {{ label }}
    </p>

    <div v-click-outside="closeDropdown">
      <div
        :class="[
          'flex items-center justify-between rounded-1.5 bg-shade-f5 cursor-pointer',
          size === 'sm' && 'h-8 px-3',
          size === 'md' && 'h-12 p-3'
        ]"
        @click="toggleOpen"
      >
        <span>
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>

        <ChevronDownIcon
          :class="['ml-1 transition-all duration-200 ease-in', isOpen ? 'rotate-180' : '']"
        />
      </div>

      <div class="relative">
        <div
          v-if="isOpen"
          class="absolute top-2 max-h-50 w-full overflow-auto rounded-1 bg-shade-f5 py-2 shadow-md z-[2]"
        >
          <div
            v-for="(option, index) in options"
            :key="index"
            @click="handleClickOption(option)"
            class="flex cursor-pointer items-center px-3 py-1.5 hover:bg-shade-e5"
          >
            <span>{{ option.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import ChevronDownIcon from '@/components/basic/icons/ChevronDownIcon.vue';

const props = defineProps({
  options: {
    type: Array,
    required: false,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: null,
    default: null,
  },
  size: {
    type: String,
    default: 'md',
  }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === value.value);
});

const isOpen = ref(false);

const closeDropdown = () => {
  isOpen.value = false;
};

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOption = (option) => {
  value.value = option.value;
  closeDropdown();
};
</script>
