<template>
  <div class="max-w-full overflow-auto">
    <table class="text-sm relative w-full">
      <BasicTableHeader :columns="columns" :sticky-header="stickyHeader">
        <template v-for="name in Object.keys($slots)" :key="name" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </BasicTableHeader>

      <tbody>
      <BasicTableRow
        v-for="(row, rowId) in data"
        :key="rowId"
        :columns="columns"
        :row="row"
        :row-id="rowId"
        :is-last-row="data.length - 1 === rowId"
        :class="rowClass"
        @click="onRowClick(row)"
      >
        <template v-for="name in Object.keys($slots)" :key="name" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </BasicTableRow>

      <tr v-if="!data.length">
        <td :colspan="columns.length">
          <slot name="no-data">
            <div class="typo-h5 px-4 py-8 text-center">No data</div>
          </slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import BasicTableHeader from '@/components/basic/table/BasicTableHeader.vue';
import BasicTableRow from '@/components/basic/table/BasicTableRow.vue';

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  stickyHeader: {
    type: Boolean,
    default: false,
  },
  rowClass: {
    type: String,
  }
});

const emit = defineEmits(['rowClick']);

const onRowClick = (row) => {
  emit('rowClick', row);
}
</script>
