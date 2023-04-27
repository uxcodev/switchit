<template>
  <label>{{ $t(filterKey) }}</label>
  <!-- <label>filterKey: {{ $t(filterKey) }}</label>
  <label>filterData: {{ filterData }}</label>
  <label>category: {{ category }}</label>
  <label>dataType: {{ dataType }}</label> -->


  <!-- String -->

  <div v-if="type === 'string'">
    <div class="input_group">
      <input type="text" :class="filterValue ? '' : 'inactive'"  placeholder="" v-model="filterValue" @input="onFilterChanged" />
      <div class="legend">includes</div>
    </div>
  </div>

  <!-- Numerical identifier (account number, phone, etc)-->

  <div v-if="type === 'identifier_number'">
    <div class="input_group">
      <input type="number" :class="filterValue ? '' : 'inactive'" v-model="filterValue" placeholder="0" @input="onFilterChanged" />
      <div class="legend">includes</div>
    </div>
  </div>

  <!-- Range number -->

  <div class="number" v-else-if="type === 'range_number'">
    <div class="input_group">
      <input type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
      <div class="legend">from</div>
    </div>
    <div class="input_group">
      <input type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
      <div class="legend">to</div>
    </div>
  </div>

  <!-- Range amount -->

  <div class="number" v-else-if="type === 'range_amount'">
    <div class="input_group">
      <input type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
      <div class="legend">from</div>
    </div>
    <div class="input_group">
      <input type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
      <div class="legend">to</div>
    </div>
  </div>

  <!-- Range slider -->
  <div v-else-if="type === 'range_slider'" class="slider_container">
    <!-- <Slider class="slider" v-model="filterRange" :min="filterData.range[0]" :max="filterData.range[1]" showTooltip="drag" @change="onFilterChanged" tooltipPosition="bottom" /> -->
    <Slider class="slider" :class="filterValue ? '' : 'inactive'" v-model="filterRange" :min="0" :max="10" showTooltip="drag" @change="onFilterChanged" tooltipPosition="bottom" />
    <div class="legend">
      <span>
        Not important
      </span>
      <span>
        Very important
      </span>
    </div>
  </div>

  <!-- Amount -->

  <div class="number" v-else-if="type === 'amount'">
    <div class="input_group">
      <input type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
      <div class="legend">from</div>
    </div>
    <div class="input_group">
      <input type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
      <div class="legend">to</div>
    </div>
  </div>

  <!-- Date -->

  <div class="date" v-else-if="type === 'date'">
    <div class="input_group">
      <input type="date" :class="filterRange[0] ? '' : 'inactive'" v-model="filterRange[0]" @input="onFilterChanged" />
      <div class="legend">from</div>
    </div>
    <div class="input_group">
      <input type="date" :class="filterRange[1] ? '' : 'inactive'" v-model="filterRange[1]" @input="onFilterChanged" />
      <div class="legend">to</div>
    </div>
  </div>

  <!-- Date range -->

  <div class="range_date" v-else-if="type === 'range_date'">

    Start date:
    <div class="date">
      <div class="input_group">
        <input type="date" :class="filterRange[0] ? '' : 'inactive'" v-model="filterRange[0]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input type="date" :class="filterRange[1] ? '' : 'inactive'" v-model="filterRange[1]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
    End date:
    <div class="date">
      <div class="input_group">
        <input type="date" :class="filterRangeEnd[0] ? '' : 'inactive'" v-model="filterRangeEnd[2]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input type="date" :class="filterRangeEnd[1] ? '' : 'inactive'" v-model="filterRangeEnd[3]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
  </div>

  <!-- Boolean -->

  <div v-else-if="type === 'boolean'">
    <label class="checkbox-label">
      <input class="checkbox" type="checkbox" v-model="filterValue" @input="onFilterChanged" />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  components: {
    Slider
  },
  props: ['filterData', 'dataType', 'filterKey', 'category'],
  emits: ['filter-changed'],
  data() {
    return {
      type: this.filterData.filter_type,
      value: this.filterData.value || this.filterData.values || null,
      filterValue: this.filterData.value || null,
      filterRange: this.value?.length ? [this.value[0], this.value[1]] : [null, null],
      filterRangeEnd: [null, null],
      types_ranges: ['date', 'range_slider', 'range_number', 'range_amount'],
      timer: null
    };
  },
  methods: {
    onFilterChanged() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        console.log('this.value', this.filterRange)
        let value;
        if (this.type === 'range_date') {
          value = { from: this.filterRange, to: this.filterRangeEnd };
        } else if (this.types_ranges.includes(this.type)) {
          value = [...this.filterRange];
        } else {
          value = this.filterValue;
        }
        if (value !== null) {
          this.$emit('filter-changed', {
            category: this.category,
            key: this.filterKey,
            filterType: this.type,
            dataType: this.dataType,
            value: value
          });
        }
        console.log(value)
      }, 1000);
    }
  },
  mounted() {
    if (this.type === 'range_slider') {
      console.log('this.value', this.filterData.range)
      this.filterRange = [0, 10]
    }
  }
};
</script>

<style scoped lang="sass">
// @import '@/styles/styles.sass'
// @import '@/styles/forms.sass'
// @import '@/styles/filters.sass'
input
  height: 34px !important
  border: none !important
  &::placeholder
    color: #aaa

.range_date
  display: flex
  flex-direction: column

.inactive
  background: rgba(255, 255, 255, .5)

</style>