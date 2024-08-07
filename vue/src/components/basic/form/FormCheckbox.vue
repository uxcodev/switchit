<template>
  <BasicCheckbox v-model="value" :error="errorMessage" />
</template>

<script setup>
import { useField } from 'vee-validate';
import BasicCheckbox from '@/components/basic/checkbox/BasicCheckbox.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const { value, errorMessage } = useField(() => props.name);
</script>
