<template>
  <div class="inline-flex items-center rounded-1 px-2 py-1 gap-1 bg-dark">
    <span class="text-xs font-medium text-shade-ee">
      {{ content }}
    </span>

    <CloseIcon
      class="w-2 h-2 shrink-0 cursor-pointer text-white"
      @click.stop="onRemove"
    />
  </div>
</template>

<script setup>
import CloseIcon from '@/components/basic/icons/CloseIcon.vue';

defineProps({
  content: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['remove']);

const onRemove = () => {
  emit('remove');
}

</script>
