<template>
  <div class="h-20 bg-darker flex justify-between items-center px-5">
    <SwitchitIcon @click="refreshPage()" class="logo" :width="40" :height="40" color="#03D0BF" />
    <div class="flex items-center gap-7.5">
      <LanguagePicker title="change language" class="icon" />
      <AvatarDropdown v-if="$auth0?.isAuthenticated" />
      <LoginButton v-else></LoginButton>
    </div>
  </div>
</template>

<script>
import SwitchitIcon from "@/components/assets/SwitchitIcon.vue";
import LoginButton from "../auth/LoginButton.vue";
import AvatarDropdown from "../auth/AvatarDropdown.vue";
import LanguagePicker from "../ui/LanguagePicker.vue";


export default {
  components: { SwitchitIcon, LoginButton, LanguagePicker, AvatarDropdown },
  data() {
    return {
      isDisabled: true,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    isApproved() {
      return this.$store.getters.activeBusinessPartner?.isApproved
      // return true
    }
  },
  methods: {
    async refreshPage() {
      await this.$store.dispatch('clearStore');
      this.$router.push({ path: '/' })
    },
  },
  mounted() {

  },
};
</script>
