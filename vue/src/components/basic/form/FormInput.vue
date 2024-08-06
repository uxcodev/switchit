<template>
  <BasicInput v-model="value" :error="errorMessage">
    <template v-for="slotName in Object.keys($slots)" :key="slotName" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData"></slot>
    </template>
  </BasicInput>
</template>

<script setup>
import { useField } from 'vee-validate';
import BasicInput from '@/components/basic/input/BasicInput.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const { value, errorMessage } = useField<string>(() => props.name);
</script>
