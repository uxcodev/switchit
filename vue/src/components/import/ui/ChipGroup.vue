<template>
  <div class="chip-group">
    <button
      v-for="(resource, index) in resources"
      :key="index"
      :class="{ 'chip': true, 'selected': resource.resource_id === selected }"
      @click="select(resource.resource_id)"
    >
      {{ resource.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    resources: Array,
  },
  data() {
    return {
      // resources: [
      //   { name: "Resource 1", resource_id: 1 },
      //   { name: "Resource 2", resource_id: 2 },
      // ],
      selected: null,
    };
  },
  methods: {
    select(resource_id) {
      this.selected = resource_id;
      // console.log(resource_id);
    },
  },
  mounted() {
    // console.log("resources: " + this.resources);
  },
};
</script>

<style lang="scss">
.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .chip {
    display: inline-flex;
    align-resources: center;
    justify-content: center;
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    font-size: 14px;
    line-height: 36px;
    border: 0;
    border-radius: 36px;
    color: #666;
    background-color: #ddd;
    transition: background-color 0.2s;

    &:hover {
      background-color: #eee;
    }

    &.selected {
      background-color: #333;
      color: white;
    }
  }
}
</style>
