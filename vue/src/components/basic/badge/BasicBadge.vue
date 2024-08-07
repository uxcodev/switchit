<template>
  <div
    :class="[
      'inline-flex items-center h-4 px-1.5  border rounded-1 text-xs',
      status === 'success' && 'bg-teal-100 text-teal-700 border-teal-200',
      status === 'pending' && 'bg-yellow-ffb text-yellow-79 border-yellow-ff8'
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
