import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    sidebarExpanded: true,
  }),
  actions: {
    setSidebarExpanded(value) {
      this.sidebarExpanded = value;
    },
  },
})
