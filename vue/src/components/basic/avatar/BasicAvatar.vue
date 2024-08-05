<template>
  <div
    :class="[
      'relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-gray-900 font-bold text-white text-xsm font-bold',
    ]"
  >
    <span>
      {{ shortName }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const shortName = computed(() => {
  const [firstName, lastName] = props.name.split(' ');

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  if (firstName && !lastName) {
    return `${firstName.charAt(0)}`;
  }

  return 'UN';
});
</script>
