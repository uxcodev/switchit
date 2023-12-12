<template>
  <div @click="showDropdown = !showDropdown" class="avatar-container">
    <img v-if="avatarUrl" :src="avatarUrl" alt="User Avatar" class="avatar" />
    <div v-if="showDropdown" class="dropdown">
      <!-- <div class="dropdown-item"><span class="material-symbols-outlined">person</span>Account</div> -->
      <router-link to="/account" class="dropdown-item"><span class="material-symbols-outlined">person</span>Account</router-link>
      <!-- <div class="dropdown-item"><span class="material-symbols-outlined">location_city</span> {{ businessPartner?.name }}</div> -->
      <router-link v-if="businessPartner" to="/company" class="dropdown-item"><span class="material-symbols-outlined">location_city</span>{{ businessPartner?.name }}</router-link>

      <!-- <div class="dropdown-item"><span class="material-symbols-outlined">exit_to_app</span> Logout</div> -->
      <div class="dropdown-item" @click="logout"><span class="material-symbols-outlined">power_rounded</span> Logout</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      //avatarUrl: this.$auth0.user.picture //'https://lh3.googleusercontent.com/a/ACg8ocLjsQymkM29uVn7-BHOKZy0OVpqSWOnJ05QzhxW70Ru=s96-c',
      // businessPartner: this.$store.getters.activeBusinessPartner
    }
  },
  computed: {
    businessPartner() {
      return this.$store.getters.activeBusinessPartner
    },
    avatarUrl() {
      return this.$auth0.user.value.picture
    }
  },
  methods: {
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
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
}

.dropdown-item:hover {
  background-color: #f7f7f7;
}
</style>
