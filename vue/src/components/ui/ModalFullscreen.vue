<template>
  <Transition @after-leave="closemodal">
    <div
      v-if="appear"
      class="modal_white"
    >
      <div
        @click="closeModal"
        class="modal_white-close material-symbols-outlined"
      >
        close
      </div>
      <slot>

      </slot>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      elements: null,
      appear: true,
      // event: null,
      // services: null,
      // selectedService: 0,
    };
  },
  emits: ["closeModal"],
  props: [
    "event_id",
    "resourceId",
    "serviceId",
    "customerId",
    "locationId",
    "duration",
  ],
  methods: {
    close() {
      this.appear = false;
    },
    closePicker() {
      this.$emit("closePicker");
    },
    setTime(date) {
      this.$emit("setTime", date);
    },
    closemodal() {
      this.$emit("closeModal");
    },
  },
  async mounted() {
    this.appear = true;
  },
};
</script>

<style lang="sass" scoped>
.modal_white
  position: absolute
  display: flex
  justify-content: center
  align-items: top
  z-index: 9999
  top: 0
  left: 80px
  width: calc(100% - 80px)
  height: 100%
  overflow: hidden
  // background-color: rgba(0,0,0,0.2)
  background-color: #fff
  padding: 20px

  &-container
    position: relative
    background-color: white
    width: 100%
    border-radius: 10px
    padding: 20px 40px

  &-close
    cursor: pointer
    position: absolute
    top: 10px
    right: 10px
    font-size: 40px

  &-content
    display: flex
    flex-direction: column
    gap: 16px

  &-actions
    margin: 30px 0
    display: flex
    justify-content: flex-end
    gap: 20px

@media only screen and (max-width: 767px)
  .modal_white
    left: 0
    width: 100%
</style>
