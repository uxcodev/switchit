<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">
      <!-- <h2>Settings</h2>  -->
      <div class="pageheader__content">
        <div class="cards lg">
          <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
          <div class="banner_lg">
            <h1>
              Your account is pending approval.
            </h1>
            <p>Once your account is approved, your opportunities will appear in the dashboard below. In the meantime, you can start learning how to get the most out of your SwitchIt account.</p>
            <button>Get more out of SwitchIt</button>
          </div>
        </div>
      </div>
      <div>
        <img class="img_placeholder mt6" src="@/images/switchit_onboarding_placeholder.svg" />
      </div>
    </div>
  </div>
</template>

<script>

// plugins & scripts

// components 
import ModalWindow from '@/components/ui/ModalWindow.vue';


export default {
  components: {
    ModalWindow
  },
  provide() {
    return {
      closeModal: () => { this.modalComponent = null },
    }
  },
  data() {
    return {
      modalComponent: null,
    };
  },
  methods: {
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
  },
  mounted() {
    // // console.log('starter page')
  }
}
</script>
<style lang="sass" scoped>
@import "/src/styles/variables.sass"
.img_placeholder
  width: 100%
// .banner_lg
//   background: $dark-blue-grey
//   color: white
//   gap: 6px
//   padding: 30px
//   align-items: flex-start
//   h1
//     margin: 0
//     color: $bright-aqua
//   button
//     color: $dark
//     background: $bright-aqua
//     border-radius: 20px
//     // flex: 0
</style>