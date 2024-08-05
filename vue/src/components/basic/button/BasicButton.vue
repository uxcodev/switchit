<template>
  <button
    :class="[
      'flex items-center justify-center h-[35px] text-[17px] leading-[18.7px] px-3 rounded-7.5 outline-none border-none',
      variant === 'primary' && 'bg-primary text-white'
    ]"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

