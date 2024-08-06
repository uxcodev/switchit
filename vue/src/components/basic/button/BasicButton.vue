<template>
  <button
    :class="[
      'flex h-10 items-center justify-center border-none px-3 text-[17px] leading-[18.7px] outline-none rounded-1',
      variant === 'filled' && color === 'primary' && 'bg-primary text-white',
      variant === 'filled' && color === 'secondary' && 'bg-blue-gray-900 text-white',
      variant === 'text' && 'bg-transparent text-shade-67 hover:bg-gray-200'
    ]"
    :type="type"
    @click.stop="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'filled',
  },
  color: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>
