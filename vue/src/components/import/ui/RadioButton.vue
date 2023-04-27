<template>
  <label class="radio flex items-center body">
    {{ label }}
    <input class="checkbox" type="radio" :name="name" :checked="isChecked" :value="value" @change="change(value)" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    "label": { type: String, default: "", required: true },
    "modelValue": { default: "" },
    "value": { type: String, default: undefined },
    "name": { type: String, default: "" },
  },
  emits: ["change"],
  computed: {
    isChecked() {
      return this.modelValue == this.value
    }
  },
  methods: {
    change(value) {
      this.$emit('change', value)
    }
  },
  mounted() {
  }
}
</script>

<style lang="sass" scoped>
/* Customize the label (the radio) */

label
  font-weight: 500
.radio 
  display: block
  position: relative
  padding-left: 35px
  margin-bottom: 0
  cursor: pointer
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  flex-grow: 1


/* Hide the browser's default radio button */
.radio input 
  position: absolute
  opacity: 0
  cursor: pointer
  height: 0
  width: 0

/* Create a custom radio button */
.checkmark 
  position: absolute
  top: 0
  left: 0
  height: 20px
  width: 20px
  border-radius: 50%
  background-color: none
  border: 1px solid #333
  display: flex
  align-items: center
  justify-content: center


/* On mouse-over, add a grey background color */
.radio:hover input~.checkmark 
  background-color: #fefefe


/* When the radio button is checked, add a blue background */
.radio input:checked~.checkmark 
  // background-color: #1CD4A7
  background-color: #333
  border: 1px solid #333


/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after 
  content: ""
  position: absolute
  display: none


/* Show the indicator (dot/circle) when checked */
.radio input:checked~.checkmark:after 
  display: flex
  width: 8px
  height: 8px
  border-radius: 50%
  background: white

</style>