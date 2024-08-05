<template>
  <div class="flex w-full">
    <div
      class="w-100 flex-shrink-0 bg-white drop-shadow-sidebar border-l border-shade-e5 p-5"
      :style="{ height: 'calc(100vh - 80px)' }"
    >
      <router-link
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.link"
        :class="[
          'hover:bg-shade-f2 group/item flex cursor-pointer items-center justify-between px-2.5 py-3.5',
          isActive(menu.link) ? 'bg-shade-f2 rounded-1' : 'border-b border-shade-e5 hover:rounded-1',
        ]"
      >
        {{ menu.label }}
      </router-link>
    </div>

    <div
      class="w-0 flex-grow overflow-y-auto px-15 pt-47.5"
      :style="{ height: 'calc(100vh - 80px)' }"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
const menus = [
  { label: 'Users', link: '/settings/users' },
  { label: 'Menu item', link: '#' },
  { label: 'Menu item', link: '#' },
]

const isActive = (path) => {
  if (path === '/settings/users') return true;
  return false;
}
</script>
