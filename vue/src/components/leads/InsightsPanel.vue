<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <div>
        <h1>{{ $t('insights') }}</h1>
      </div>

      <ChatPanel :type="type" :key="isOpen" />
    </div>

  </div>
</template>
<script>
import ChatPanel from '@/components/leads/ChatPanel.vue';

export default {
  name: "InsightsPanel",
  components: {
    ChatPanel
  },
  data() {
    return {}
  },
  computed: {
    isOpen() {
      return this.$store.getters.isOpenInsights;
    },
    insightsInPage() {
      return this.$store.getters.insightsInPage;
    },
    type() {
      return this.insightsInPage === 'dashboard' ? 'dashboard-insight' : 'offer-insight';
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeInsightsMenu')
    },
  },
};
</script>

<style lang="sass" scoped>
@import "/src/styles/_variables.sass"
ul
  li
    list-style: disc !important
    &::marker
      color: #fff

.inline_center
  display: flex
  align-items: center
  gap: 10px

  &.input_button
    gap: 0px
    position: relative

    input
      min-width: 100%
      margin: 0
      border: 0
      padding-right: 45px
      height: 40px
      border-radius: 6px

    button
      position: absolute
      right: 0px
      height: 40px
      width: 40px
      border: 0
      border-radius: 0 6px 6px 0
      color: $white
      background-color: $green

.filterset
  color: rgba(white, .7)

  &-list_item
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 0.1rem
    padding: 0.1rem

    .filterset-name
      font-size: .8rem
      cursor: pointer

    .material-symbols-outlined
      font-size: .9rem
      cursor: pointer

      &:hover
        color: #ff0000
</style>
