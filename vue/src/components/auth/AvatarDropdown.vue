<template>
  <div @click="showDropdown = !showDropdown" class="avatar-container">
    <img v-if="avatarUrl" :src="avatarUrl" alt="User Avatar" class="avatar" />
    <div v-if="showDropdown" class="dropdown">
      <router-link to="/profile" class="dropdown-item"><span class="material-symbols-outlined">person</span>Your profile</router-link>
      <router-link v-if="businessPartner" to="/company" class="dropdown-item"><span class="material-symbols-outlined">location_city</span>{{ businessPartner?.name }}</router-link>
      <div class="dropdown-item" @click="logout"><span class="material-symbols-outlined">power_rounded</span> Logout</div>
    </div>
  </div>
</template>

<script>

import avatarDefault from '@/images/avatar_default.png'
export default {
  data() {
    return {
      showDropdown: false,
    }
  },
  computed: {
    businessPartner() {
      return this.$store.getters.activeBusinessPartner
    },
    avatarUrl() {
      return this.$auth0.user.value.picture || avatarDefault
    }
  },
  methods: {
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    },
  },
  async mounted() {
  },

}
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 40px;
  height: auto;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.dropdown {
  z-index: 9999;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  text-decoration: none;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #f7f7f7;
}
</style>
