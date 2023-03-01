<template>
  <component :is="component" v-for="(resource, index) in resources" :key="index" @click="selectResource(resource.id)" :selected="resource.id === id" :name="resource.name" :size="size" :src="resource.imageUrl" />
  <!-- <AvatarName v-for="(resource, index) in resources" :key="index" @click="selectResource(resource.id)" :selected="resource.id === id" :name="resource.name" :size="size" :src="resource.imageUrl" /> -->
  <!-- <AvaTar v-for="(resource, index) in resources" :key="index" :class="{ selected: resource.id === id }" @click="selectResource(resource.id)" :name="resource.name" :size="size" :src="resource.imageUrl" /> -->
</template>

<script>
import AvaTar from '@/components/assets/AvaTar.vue'
import AvatarName from '@/components/assets/AvatarName.vue'
export default {
  components: { AvaTar, AvatarName },
  data() {
    return {
      id: null,
      component: null,
      resources: null
    };
  },
  inject: ["getResources"],
  props: ["column", "size", "names"],
  emits: ["selectResource",],
  methods: {
    selectResource(id) {
      this.id = id
      this.$emit("selectResource", id)
    }
  },
  async mounted() {
    if (!this.resources) {
      this.resources = this.getResources()
    }
    this.component = this.names ? "AvatarName" : "AvaTar"
    this.id = this.resources[0].id
    this.$emit("selectResource", this.id)
  },
};
</script>

<style lang="sass" scoped>
@media only screen and (max-width: 767px)
</style>
