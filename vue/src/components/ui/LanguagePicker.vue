<template>
  <div class="language-picker">
    <div class="flag nav" @click="showModal">
      <img :src="flagImg" alt="Language flag">
    </div>
    <Transition name="fade">
      <div class="modal_overlay" v-show="isModalOpen" @click="hideModal"></div>
    </Transition>
    <Transition name="fade">
      <div class="modal_language" v-show="isModalOpen">
        <div class="title">
          Language
        </div>
        <div class="content">
          <label v-for="lang in languages" :key="lang.code">
            <input type="radio" name="language" @click="handleClick(lang.code)" v-model="$i18n.locale" :value="lang.code">
            <img class="flag ml2" :src="flagImage(lang.code)"><span>{{ lang.name }}</span>
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import cookies from 'vue-cookies';

export default {
  data() {
    return {
      isModalOpen: false,
      languages: [
        { code: 'en-US', name: 'English' },
        { code: 'da-DK', name: 'Dansk' },
        // { code: 'fr-FR', name: 'Français' },
      ]
    };
  },
  computed: {
    flagImg() {
      return require(`@/i18n/flags/${this.$i18n.locale}.svg`);
    },
  },
  methods: {
    flagImage(locale) {
      return require(`@/i18n/flags/${locale}.svg`);
    },
    showModal() {
      this.isModalOpen = true;
    },
    hideModal() {
      this.isModalOpen = false;
    },
    handleClick(locale) {
      setTimeout(() => {
        cookies.set('lang', locale);
        this.hideModal();
      }, 500);
    },
  },
  beforeMount() {
    const langCookie = cookies.get('lang');
      if (langCookie) {
        this.$i18n.locale = langCookie;
      }
  },
};
</script>

<style lang="sass" scoped>
.language-picker
  display: flex
  align-items: center
  justify-content: center
  position: relative

  .flag
    display: flex
    border-radius: 50%
    overflow: hidden
    cursor: pointer
    height: 24px
    width: 24px
    img
      object-fit: cover


  .modal_overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.2)
    z-index: 999

  .modal_language
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    min-width: 180px
    max-width: 80%
    background-color: #fff

    border-radius: 12px
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
    z-index: 1000
    overflow: hidden

    .title
      color: #aaa
      text-transform: uppercase
      //character spacing
      letter-spacing: .4em
      font-size: .7em
      font-weight: 400
      padding: 16px
      margin-top: 0
      background: #333
    
    .content
      padding: 16px 0
      display: flex
      flex-direction: column
      gap: 0px

      label
        font-weight: 400
        display: flex
        align-items: center
        gap: 6px
        cursor: pointer
        padding: 10px 16px
        border-radius: 6px
        &:hover
          background: #fafafa
        &:active
          background: #eee  
        
      img

      input
        margin: 0

</style>

