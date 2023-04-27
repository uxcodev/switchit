<!-- Toast.vue -->
<template>
  <transition name="fade">
    <div v-if="visible" class="toast" :class="type">
      <span v-if="icon" class="icon material-symbols-outlined">{{icon}}</span>
      <span class="toast-msg">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'check',
    },
    icon: {
      type: String,
      default: null,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show(updatedProps) {
    Object.assign(this.$data, this.$options.data.call(this), updatedProps);
    this.visible = true;
    if (this.duration !== 0) {
      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    }
  },
  },
};
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
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
}
</style>
