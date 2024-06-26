<template>
  <div :class="['sidebar', isOpen ? '' : 'sidebar-hidden']">
    <div @click="closeModal" class="close material-symbols-outlined">
      close
    </div>
    <div class="sidebar-content">
      <section>
        <div>
          <h1>{{ $t('insights') }}</h1>
        </div>
        <div v-if="insightsInPage === 'dashboard'">
          <h3>Insights About Current Household Services:</h3>
          <ul>
            <li>"Average monthly spending on broadband services across all users is DKK 350, with the highest
              expenditure observed in urban areas of Denmark."
            </li>
            <li>"The most common contract duration for mobile services among households is 24 months, indicating a
              stable customer base for long-term offers."
            </li>
            <li>"Energy consumption peaks during winter months, suggesting an opportunity for promoting energy-efficient
              solutions starting October."
            </li>
          </ul>
          <h3>Insights About Household Preferences:</h3>
          <ul>
            <li>"Over 65% of households prefer eco-friendly energy solutions, with a notable interest in solar and wind
              energy products."
            </li>
            <li>"There is a 40% higher preference for high-speed internet among households with teenagers, indicating a
              targeted opportunity for broadband upgrades."
            </li>
            <li>"Customer feedback indicates a strong preference for bundled services, with a 30% increase in
              satisfaction when offered combined utility packages."
            </li>
          </ul>
          <h3>Insights About Household Trends:</h3>
          <ul>
            <li>"There has been a 25% increase in the adoption of smart home devices within the last year, signaling a
              growing market for integrated home solutions."
            </li>
            <li>"Households in coastal regions show a 50% greater interest in weather-related insurance services,
              highlighting regional service opportunities."
            </li>
            <li>"Recent data shows a trend towards remote work setups, with a 20% uptick in households upgrading to
              higher internet bandwidth plans."
            </li>
          </ul>


        </div>
        <div v-if="insightsInPage === 'offer'">
          <h3>Insights About Current Household Services:</h3>
          <ul>
            <li>"For households in [specified city/country], the average annual expenditure on car insurance is 10%
              below the national average, suggesting price sensitivity in this region."
            </li>
            <li>"In [specified sector], households have shown a 15% faster adoption rate for new mobile service plans
              compared to last year, with the majority opting for unlimited data plans."
            </li>
          </ul>
          <h3>Insights About Household Preferences:</h3>
          <ul>
            <li>"Households filtered by eco-friendly preferences show a 75% likelihood to switch providers if offered
              sustainable energy alternatives at a competitive price."
            </li>
            <li>"User interactions reveal that households prioritizing customer support are 30% more loyal and provide
              higher NPS scores to their service providers."
            </li>
          </ul>
          <h3>Insights About Household Trends:</h3>
          <ul>
            <li>"Analysis of transactional data from emails and banking reveals that households in [specified area] have
              increased their spending on home security systems by 20% over the past six months."
            </li>
            <li>"There is a rising trend among selected households for seeking bundled home services, particularly in
              telecommunications, with a 35% increase noted in bundle purchases."
            </li>
          </ul>
        </div>
      </section>
    </div>

  </div>
</template>
<script>

export default {
  name: "InsightsPanel",
  components: {
    // Slider,
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
