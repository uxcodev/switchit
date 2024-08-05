<template>
  <thead>
    <tr>
      <th
        v-for="(col, colId) in columns"
        :key="col.id"
        class="bg-blue-gray-600 px-4 py-4.5 text-sm font-normal text-shade-dd [&:first-child]:rounded-l-2.5 [&:last-child]:rounded-r-2.5"
        :class="[getAlignClass(col.align), col.thClass, stickyHeader && 'z-1 sticky top-0']"
      >
        <slot v-if="$slots[`th-${col.id}`]" :name="'th-' + col.id" :col="col" :col-id="colId" />
        <slot v-else-if="$slots.th" name="th" :col="col" :col-id="colId" />
        <template v-else>
          {{ col.title }}
        </template>
      </th>
    </tr>

    <tr>
      <td :colspan="columns.length" class="h-2.5"></td>
    </tr>
  </thead>
</template>

<script setup>
import { getAlignClass } from './utils';

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  stickyHeader: {
    type: Boolean,
    default: false,
  },
});
</script>
