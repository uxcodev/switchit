
<template>
  <!-- <div v-if="failed" class="failed">Page failed to load</div> -->
  <div
    v-if="$root.loading && !failed"
    class='overlay'
  >
    <div class='loader'>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    failed: false,
  }),
  watch: {
    "$root.loading": async function () {
      this.failed = false;
      let cancelLoad = () => {
        this.failed = true;
        this.$root.loading = false;
      };
      setTimeout(cancelLoad, 10000);
    },
  },
};
</script>
<style scoped>
.failed {
  width: 100%;
  padding: 4px;
  color: white;
  background: #333;
}
.loader {
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 6px;
}
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 99999;
}

.hide {
  display: none;
}
.lds-ring {
  align-items: center;
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #666 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
