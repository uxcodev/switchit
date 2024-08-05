<template>
  <td
    :class="[
      'bg-white px-4 py-2.5',
      getAlignClass(col.align),
      tdClass,
      colId === 0 && rowId === 0 && 'rounded-tl-2.5',
      isLastCell && rowId === 0 && 'rounded-tr-2.5',
      colId === 0 && isLastRow && 'rounded-bl-2.5',
      isLastCell && isLastRow && 'rounded-br-2.5'
    ]"
  >
    <slot
      v-if="$slots[`td-${col.id}`]"
      :name="'td-' + col.id"
      :value="value"
      :col="col"
      :row="row"
      :col-id="colId"
      :row-id="rowId"
    />
    <slot
      v-else-if="$slots.td"
      name="td"
      :value="value"
      :col="col"
      :row="row"
      :col-id="colId"
      :row-id="rowId"
    />
    <template v-else>
      {{ value }}
    </template>
  </td>
</template>

<script setup lang="ts">
import { getAlignClass } from './utils';
import { get } from '@/utils/get';
import { computed, PropType } from 'vue';

const props = defineProps({
  col: {
    type: Object,
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
  colId: {
    type: Number,
    required: true,
  },
  isLastCell: {
    type: Boolean,
    required: false,
  },
  isLastRow: {
    type: Boolean,
    default: false,
  }
});

const value = computed(() => {
  if (props.col?.valueGetter) {
    return props.col.valueGetter(props.row, props.rowId);
  }
  return get(props.row, props.col.id);
});

const tdClass = computed(() => {
  if (typeof props.col?.tdClass === 'function') {
    return props.col.tdClass(props.row, props.rowId);
  }
  return props.col?.tdClass;
});
</script>
