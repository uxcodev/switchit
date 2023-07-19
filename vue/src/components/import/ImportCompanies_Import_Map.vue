<template>
  <div class="table master-form">
    <div v-for="(value, key) in jsonTable[0]" :key="key" class="form-row">
      <div class="table_field">
        <label>{{ key }}</label>
        <div>{{ value }}</div>
      </div>
      <span class="arrow material-symbols-outlined">arrow_right_alt</span>
      <select :class="form[key] ? '' : 'warn'" v-model="form[key]" class="select">
        <option :key="0" value="">don't import</option>
        <option v-for="(options, fieldName) in mappingDictionary" :key="fieldName" :value="fieldName">
          {{ fieldName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  props: {
    jsonTable: {
      type: Array,
      required: true,
    },
    mappingDictionary: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const form = reactive({});

    const lookupKey = computed(() => {
      const invertedMapping = {};
      for (const [key, values] of Object.entries(props.mappingDictionary)) {
        for (const value of values) {
          invertedMapping[value] = key;
        }
      }
      return invertedMapping;
    });

    for (const key in props.jsonTable[0]) {
      const originalKey = lookupKey.value[key];
      form[key] = originalKey;
    }

    return { form, lookupKey };
  },
};
</script>



<style lang="sass" scoped>
.table
  width: 580px
  padding-right: 50px
  max-height: 400px
  overflow-y: scroll
  overflow-x: hidden
.form
  display: flex
  flex-direction: column
  gap: 10px

.form-row
  display: flex
  align-items: center
  gap: 40px

.table_field
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 120px
  div 
    font-size: .7rem
    color: #999
  label 
    font-weight: bold
    font-size: .8rem

.select
  flex: 1
.warn
  border: 1px solid #FFD54F
  background: #FFF8E1
  color: rgba(0,0,0,.5)
.arrow
  color: #ccc  
</style>
