<template>
  <section v-if="loaded">
    <label>{{ $t(filterKey) }}</label>
    <!-- <label v-if="filterData.values.length">filterValue: {{ filterData.values }}</label> -->
    <!-- <label>filterKey: {{ $t(filterKey) }}</label>
      <label>filterData: {{ filterData }}</label>
    <label>category: {{ category }}</label>
    <label>dataType: {{ dataType }}</label> -->
  
  
    <!-- String -->
  
    <div v-if="type === 'string'">
      <div class="input_group">
        <input name="string" type="text" :class="filterValue ? '' : 'inactive'" placeholder="" v-model="filterValue" @input="onFilterChanged" />
        <div class="legend">includes</div>
      </div>
    </div>
  
    <!-- Numerical identifier (account number, phone, etc)-->
  
    <div class="number" v-if="type === 'identifier_number'">
      <div class="input_group">
        <input name="from" type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input name="to" type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
  
    <!-- Range number -->
  
    <div class="number" v-if="type === 'range_number'">
      <div class="input_group">
        <input name="from" type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input name="to" type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
  
    <!-- Range amount -->
  
    <div class="number" v-if="type === 'range_amount'">
      <div class="input_group">
        <input name="from" type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input name="to" type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
  
    <!-- Range slider -->
    <div v-if="type === 'range_slider'" class="slider_container">
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
  
    <div class="number" v-if="type === 'amount'">
      <div class="input_group">
        <input name="from" type="number" :class="filterRange[0] ? '' : 'inactive'" placeholder="0" v-model="filterRange[0]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input name="to" type="number" :class="filterRange[1] ? '' : 'inactive'" placeholder="0" v-model="filterRange[1]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
  
    <!-- Date -->
  
    <div class="date" v-else-if="type === 'date'">
      <div class="input_group">
        <input name="from" type="date" :class="filterRange[0] ? '' : 'inactive'" v-model="filterRange[0]" @input="onFilterChanged" />
        <div class="legend">from</div>
      </div>
      <div class="input_group">
        <input  name="to" type="date" :class="filterRange[1] ? '' : 'inactive'" v-model="filterRange[1]" @input="onFilterChanged" />
        <div class="legend">to</div>
      </div>
    </div>
  
    <!-- Date range -->
  
    <div class="range_date" v-if="type === 'range_date'">
  
      Start date:
      <div class="date">
        <div class="input_group">
          <input name="from" type="date" :class="filterRange[0] ? '' : 'inactive'" v-model="filterRange[0]" @input="onFilterChanged" />
          <div class="legend">from</div>
        </div>
        <div class="input_group">
          <input name="to" type="date" :class="filterRange[1] ? '' : 'inactive'" v-model="filterRange[1]" @input="onFilterChanged" />
          <div class="legend">to</div>
        </div>
      </div>
      End date:
      <div class="date">
        <div class="input_group">
          <input name="from" type="date" :class="filterRangeEnd[0] ? '' : 'inactive'" v-model="filterRangeEnd[0]" @input="onFilterChanged" />
          <div class="legend">from</div>
        </div>
        <div class="input_group">
          <input name="to" type="date" :class="filterRangeEnd[1] ? '' : 'inactive'" v-model="filterRangeEnd[1]" @input="onFilterChanged" />
          <div class="legend">to</div>
        </div>
      </div>
    </div>
  
    <!-- Boolean -->
  
    <div v-if="type === 'boolean'">
      <label class="checkbox-label">
        <input name="boolean" class="checkbox" type="checkbox" v-model="filterValue" @input="onFilterChanged" />
        <span class="checkmark"></span>
      </label>
    </div>
  </section>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  components: {
    Slider
  },
  props: ['filterData', 'dataType', 'filterKey', 'category', 'currentValue'],
  emits: ['filter-changed'],
  data() {
    return {
      filterValue: null,
      filterRange: null,
      filterRangeEnd: null,
      types_ranges: ['date', 'range_slider', 'range_number', 'identifier_number', 'range_amount'],
      timer: null,
      loaded: false
    };
  },
  computed: {
    type() {
      return this.filterData?.filter_type || null;
    },
    value() {
      console.log('filterData',this.filterData)
      return this.filterData?.value || this.filterData?.values || null;
    }
  },
  watch: {
    filterData: {
      immediate: true,
      handler() {
        this.updateComponentState();
      },
      deep: true,
    },
    currentValue: {
      immediate: true,
      handler() {
        this.updateComponentState(this.currentValue);
      },
    }
  },
  methods: {
    updateComponentState(overrideValue = null) {
      if (this.type === 'range_date') {
        console.log('type is date. value: ', this.value)
        this.filterRange = overrideValue?.from || this.value?.from || [null, null];
        this.filterRangeEnd = overrideValue?.to || this.value?.to || [null, null];
      } else if (this.type === 'range_slider') {
        this.filterRange = overrideValue || this.value || [0, 10];
      } else if (this.types_ranges.includes(this.type)) {
        this.filterRange = overrideValue || this.value || [null, null];
      } else {
        this.filterValue = overrideValue || this.value || null;
      }
      this.loaded = true
    },
    onFilterChanged() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
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
        console.log('value: ', value)
      }, 1000);
    }
  },
  mounted() {
    // if (this.type === 'range_slider') {
    //   this.filterRange = [0, 10]
    // }
  },
  beforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

};
</script>

<style scoped lang="sass">
// @import '@/styles/styles.sass'
// @import '@/styles/forms.sass'
// @import '@/styles/filters.sass'

section
  gap: 0

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