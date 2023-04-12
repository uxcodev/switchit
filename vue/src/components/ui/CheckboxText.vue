<template>
  <label class="check-box flex items-center body">
    {{ label }}
    <input class="checkbox" type="checkbox" :disabled="disabled" :name="name" :value="value" @change="change(value)" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  props: {
    "label": { type: String, default: "" },
    "value": { type: String, default: undefined },
    "name": { type: String, default: "" },
    "disabled": { type: Boolean, default: false },
  },
  emits: ["change"],
  computed: {
    isChecked() {
      return this.modelValue == this.value
    }
  },
  methods: {
    change(value) {
      // // console.log(value)
      this.$emit('change', value)
    }
  },
  mounted() {
  }
}
</script>

<style lang="sass" scoped>
/* Customize the label (the check-box) */
@import "/src/styles/variables.sass"

</style>