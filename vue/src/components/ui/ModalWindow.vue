<template>
  <Transition @after-leave="closeModal" name="container">
    <div v-if="appear" class="modal">
      <div class="modal-container">
        <div @click="closeModal" class="modal-close material-symbols-outlined">
          close
        </div>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      appear: true,
    };
  },
  emits: ["closeModal"],
  props: [
    "component",
  ],
  methods: {
    close() {
      this.appear = false;
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  async mounted() {
    this.appear = true;
    // // console.log(this.getResources())
  },
};
</script>

<style lang="sass" scoped>
.modal
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  z-index: 9997
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.2)
  padding: 20px

  &-container
    position: relative
    background-color: white
    width: auto
    min-width: 100px
    min-height: 100px
    max-width: 100%
    border-radius: 10px
    padding: 20px 40px

  &-close
    cursor: pointer
    position: absolute
    top: 10px
    right: 10px

  &-content
    display: flex
    flex-direction: column
    gap: 16px
    width: 280px // check why this isn't needed in EventEdit
    .small
      font-weight: 300
      font-size: .6em

  &-actions
    margin: 30px 0
    display: flex
    justify-content: flex-end
    gap: 20px

  &-buttons
    display: flex
    align-items: center
    gap: 20px
  .between
    justify-content: space-between
    align-items: center
  .dangerous
    font-size: .8rem
    color: red

.container-enter-active,
.container-leave-active,
.container-enter-active .modal,
.container-leave-active .modal,
.container-enter-active .modal-container,
.container-leave-active .modal-container
  transition: all 0.15s ease

.container-enter-from,
.container-leave-to
  opacity: 0

.container-enter-from .modal-container,
.container-leave-to .modal-container
  transform: translateX(-40px)

.back
  position: absolute
  top: 5px
  left: 5px
  font-size: 2rem
  opacity: .3
  cursor: pointer
@media only screen and (max-width: 767px)

</style>
