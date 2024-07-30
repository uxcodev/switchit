<template>
  <component :is="name" />
</template>

<script>
import { defineComponent } from 'vue';
import CampaignIcon  from '@/components/basic/icons/CampaignIcon.vue';
import ChevronRightIcon  from '@/components/basic/icons/ChevronRightIcon.vue';
import DashboardIcon from '@/components/basic/icons/DashboardIcon.vue';
import LeadIcon from '@/components/basic/icons/LeadIcon.vue';
import OfferIcon from '@/components/basic/icons/OfferIcon.vue';
import ReportIcon from '@/components/basic/icons/ReportIcon.vue';
import SettingIcon from '@/components/basic/icons/SettingIcon.vue';
import SupportIcon from '@/components/basic/icons/SupportIcon.vue';

export default defineComponent({
  name: 'BasicIcon',
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  components: {
    CampaignIcon,
    ChevronRightIcon,
    DashboardIcon,
    LeadIcon,
    OfferIcon,
    ReportIcon,
    SettingIcon,
    SupportIcon,
  },
})
</script>
