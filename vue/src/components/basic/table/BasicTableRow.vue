<template>
  <tr>
    <BasicTableCell
      v-for="(col, colId) in columns"
      :key="col.id"
      :col="col"
      :row="row"
      :col-id="colId"
      :row-id="rowId"
      :is-last-cell="columns.length - 1 === colId"
      :is-last-row="isLastRow"
    >
      <template v-for="name in Object.keys($slots)" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </BasicTableCell>
  </tr>
</template>

<script setup>
import BasicTableCell from '@/components/basic/table/BasicTableCell.vue';

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  row: {
    type: Object,
    required: true,
  },
  rowId: {
    type: Number,
    required: true,
  },
  isLastRow: {
    type: Boolean,
    default: false,
  }
});
</script>
