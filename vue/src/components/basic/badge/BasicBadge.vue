<template>
  <div
    :class="[
      'inline-flex items-center h-4 px-1.5  border rounded-1 text-xs',
      status === 'success' && 'bg-teal-100 text-teal-700 border-teal-200',
      status === 'pending' && 'bg-yellow-100 text-yellow-700 border-yellow-200',
      status === 'error' && 'bg-red-100 text-red-700 border-red-200'
    ]"
  >
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'success',
  }
})
</script>
