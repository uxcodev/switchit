<template>
  <div class="tabs-container">
    <div
      v-for="item in tabs"
      :key="item.value"
      :class="['tab-item', item.value === activeTab && 'active']"
      @click="changeTab(item.value)"
    >
      <div :class="['tab-label', item.value === activeTab && 'active']">
        <span v-if="item.icon" class="material-symbols-outlined">{{ item.icon }}</span>
        <span>
          {{ item.label }}
        </span>
      </div>

      <div :class="['indicator', item.value === activeTab && 'active']">
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String
  }
});

const emit = defineEmits(["change"]);

const changeTab = (value) => {
  emit('change', value);
}
</script>

<style lang="sass" scoped>
@import "/src/styles/_variables.sass"

.tabs-container
  display: flex
  align-items: center
  column-gap: 20px

  .tab-item
    position: relative
    cursor: pointer

    .tab-label
      white-space: nowrap
      font-size: 16px
      display: flex
      align-items: center
      column-gap: 8px

      &.active
        font-weight: bold

    .indicator
      height: 2px
      transition: all ease-in 200ms
      background-color: $green
      width: 0
      margin-top: 6px
      border-radius: 8px

      &.active
        width: 100%



</style>
