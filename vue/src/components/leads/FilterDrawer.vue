<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <TabList
          :tabs="tabs"
          :active-tab="activeTab"
          @change="changeTab"
      />

      <FilterPanel v-if="activeTab === 'filter'" />
      <ChatPanel v-if="activeTab === 'chat'" />
    </div>
  </div>
</template>
<script>
import TabList from "@/components/import/ui/TabList.vue";
import FilterPanel from '@/components/leads/FilterPanel.vue';
import ChatPanel from '@/components/leads/ChatPanel.vue';

export default {
  name: "TheSidebar",
  components: {
    ChatPanel,
    FilterPanel,
    TabList
  },
  data() {
    return {
      activeTab: 'chat'
    }
  },
  computed: {
    tabs() {
      return [
        { label: 'Chat', value: 'chat', icon: 'chat' },
        { label: 'Filter', value: 'filter', icon: 'tune' },
      ]
    },
    isOpen() {
      return this.$store.getters.isOpen;
    }
  },

  methods: {
    closeModal() {
      this.$store.dispatch('closeMenu')
    },
    changeTab(value) {
      this.activeTab = value;
    }
  },
};
</script>

<style lang="sass" scoped>

</style>
