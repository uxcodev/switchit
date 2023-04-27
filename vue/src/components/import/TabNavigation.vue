<!-- src/components/TabNavigation.vue -->
<template>
  <ul class="tab-nav">
    <li v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)" :class="{ active: activeTab === index }">{{ tab.title }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    selectTab(index) {
      this.$emit('update:activeTab', index);
    },
  },
};
</script>

<style>
.tab-nav {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tab-nav li {
  cursor: pointer;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
}

.tab-nav li.active {
  border-bottom: 2px solid #007bff;
}
</style>
