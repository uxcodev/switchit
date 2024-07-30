<template>
  <div
    :class="[
      'drop-shadow-sidebar group/sidebar relative z-[10000] flex flex-col justify-between bg-white p-2.5 transition-all duration-200 ease-in',
      sidebarExpanded && 'w-100',
      !sidebarExpanded && 'w-15 overflow-hidden hover:w-100',
    ]"
  >
    <div>
      <router-link
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.link"
        :class="[
          'hover:bg-shade-f2 group/item flex cursor-pointer items-center justify-between rounded-1 px-2.5 py-3.5',
          isActive(menu.link) && 'bg-shade-f2',
        ]"
      >
        <div class="flex items-center gap-4">
          <BasicIcon :name="menu.icon" class="h-5 w-5 flex-shrink-0" />
          <span :class="[!sidebarExpanded && 'hidden group-hover/sidebar:block']">
            {{ menu.label }}
          </span>

          <span
            v-if="menu.label === 'Leads'"
            :class="[
              'bg-primary rounded-2.5 px-1 py-0.5 text-xsm text-white',
              !sidebarExpanded && 'hidden group-hover/sidebar:block',
            ]"
          >
            {{ leadCount.toLocaleString() }}
          </span>
        </div>

        <ChevronRightIcon class="hidden h-5 w-5 group-hover/item:block" />
      </router-link>
    </div>

    <div>
      <router-link
        v-for="(menu, index) in bottomMenus"
        :key="index"
        :to="menu.link"
        :class="[
          'hover:bg-shade-f2 group/bottom-item flex cursor-pointer items-center justify-between gap-4 rounded-1 px-2.5 py-3.5',
          isActive(menu.link) && 'bg-shade-f2',
        ]"
      >
        <div class="flex items-center gap-4">
          <BasicIcon :name="menu.icon" class="h-5 w-5 flex-shrink-0" />

          <span :class="[!sidebarExpanded && 'hidden group-hover/sidebar:block']">
            {{ menu.label }}
          </span>
        </div>
        <ChevronRightIcon class="hidden h-5 w-5 group-hover/bottom-item:block" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import BasicIcon from '@/components/basic/icons/index.vue';
import ChevronRightIcon from '@/components/basic/icons/ChevronRightIcon.vue';
import { useLayoutStore } from '@/stores/layout.store';

const route = useRoute();
const layoutStore = useLayoutStore();
const { sidebarExpanded } = storeToRefs(layoutStore);

const leadCount = ref(4697);

const isActive = (path) => {
  return route.path === path;
}

const menus = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    icon: 'DashboardIcon',
  },
  {
    label: 'Campaigns',
    link: '/campaigns',
    icon: 'CampaignIcon',
  },
  {
    label: 'Offers',
    link: '/offers',
    icon: 'OfferIcon',
  },
  {
    label: 'Leads',
    link: '/leads',
    icon: 'LeadIcon',
  },
  {
    label: 'Reports',
    link: '/reports',
    icon: 'ReportIcon',
  },
];

const bottomMenus = [
  {
    label: 'Settings',
    link: '/settings',
    icon: 'SettingIcon',
  },
  {
    label: 'Support',
    link: '/support',
    icon: 'SupportIcon',
  },
];

watch(route, (to) => {
  if (to.path === '/offers') {
    layoutStore.setSidebarExpanded(false);
  } else {
    layoutStore.setSidebarExpanded(true);
  }
}, { deep: true, immediate: true, flush: 'pre' });
</script>
