<template>
  <div class="chip-group">
    <button v-for="(resource, index) in resources" :key="index" :class="{
      chip: true,
      selected: resource.resourceId === selectedResourceId,
    
    }" @click="selectResource(resource.resourceId)">
      {{ resource.name }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedResourceId: null
    };
  },
  props: ["resources"],
  emits: ["selectResource"],
  methods: {
    selectResource(id) {
      this.selectedResourceId = id
      this.$emit("selectResource", id)
    }
  },
  async mounted() {
  },
};
</script>

<style lang="sass" scoped>
</style>
