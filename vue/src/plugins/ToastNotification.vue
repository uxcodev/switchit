<!-- Toast.vue -->
<template>
  <transition name="toast">
    <div v-if="visible" class="toast" :class="type" :key="message">
      <span v-if="icon" class="icon material-symbols-outlined">{{ icon }}</span>
      <span class="toast-msg">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {

  data() {
    return {
      visible: false,
      message: '',
      type: '',
      icon: '',
      duration: 0,
      toastTimer: null,
    };
  },
  methods: {
    async show(params) {
      console.log('new params', params);
      Object.assign(this.$data, this.$options.data.call(this), params);
      this.visible = true;
    
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
  
      if (this.duration !== 0) {
        this.toastTimer = setTimeout(() => {
          this.visible = false;
        }, this.duration);
      }
    },
  },
};
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #444;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
}

.toast.info {
  background-color: #007bff;
}

.toast.warning {
  background-color: #ffc107;
}

.toast.error {
  background-color: #dc3545;
}

.toast.success {
  background-color: #28a745;
}

@media only screen and (max-width: 767px) {
  .toast {
    position: fixed;
    width: 100vw;
    top: 0px;
    bottom: auto;
    right: auto;
    border-radius: 0px;
    height: 60px;
  }
}</style>
