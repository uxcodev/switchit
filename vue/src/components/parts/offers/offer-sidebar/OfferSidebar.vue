<template>
  <div
    class="bg-white w-100 flex flex-col gap-"
    :style="{ height: 'calc(100vh - 80px)' }"
  >
    <div class="flex h-11.5 flex-shrink-0">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'w-0 flex-grow flex items-center justify-center h-full cursor-pointer',
          activeTab === tab.value ? 'bg-white' : 'bg-shade-e5 text-black/40'
        ]"
        @click="activeTab = tab.value"
      >
        <span>{{ tab.label }}</span>
      </div>
    </div>

    <div class="h-0 flex-grow overflow-auto">
      <OfferHousehold v-if="activeTab === OFFER_TABS.HOUSEHOLD" />
      <OfferInsights v-if="activeTab === OFFER_TABS.INSIGHTS" />
    </div>
  </div>
</template>

<script setup>
import { OFFER_TABS } from '@/components/parts/offers/offer-sidebar/constants';
import { ref } from 'vue';
import OfferHousehold from '@/components/parts/offers/offer-sidebar/OfferHousehold.vue';
import OfferInsights from '@/components/parts/offers/offer-sidebar/OfferInsights.vue';

const tabs = [
  { label: 'Household', value: OFFER_TABS.HOUSEHOLD },
  { label: 'Insights', value: OFFER_TABS.INSIGHTS }
];

const activeTab = ref(OFFER_TABS.HOUSEHOLD);
</script>
