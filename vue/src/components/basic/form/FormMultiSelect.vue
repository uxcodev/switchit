<template>
  <BasicMultiSelect v-model="value" :error="errorMessage" />
</template>

<script setup>
import { useField } from 'vee-validate';
import BasicMultiSelect from '@/components/basic/select/BasicMultiSelect.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const { value, errorMessage } = useField(() => props.name);
</script>
