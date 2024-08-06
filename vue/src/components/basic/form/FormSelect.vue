<template>
  <BasicSelect v-model="value" :error="errorMessage" />
</template>

<script setup>
import { useField } from 'vee-validate';
import BasicSelect from '@/components/basic/select/BasicSelect.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const { value, errorMessage } = useField(() => props.name);
</script>
