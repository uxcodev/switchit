<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">

      <!-- <FilterTabs @applyFilterTabs="applyFilterTabs" /> -->
      <div>
        <h2 class="mt0 mb2">Offers</h2>
        <div style="color:#666">Offers that have been sent to specified leads</div>
      </div>
      <div class="table">
        <div class="table-header">
          <div v-show="false" class="table-header-check">
            <label class="checkbox-label nolabel">
              <input class="checkbox" type="checkbox" v-model="selectAll" id="select_all" />
              <span class="checkmark transparent"></span>
            </label>
          </div>
          <div class="table-header-content">
            <div class="table-header-content-med">Offer name</div>
            <div class="table-header-content-med">Period</div>
            <div class="table-header-content-med">Categories</div>
            <div class="table-header-content-sm">Stats</div>
          </div>
          <div class="table-row-actions"></div>
        </div>
        <div v-if="offers.length" class="table-rows">
          <div v-for="(offer, index) in offers" :key="index" class="table-row">
            <div v-show="false" class="table-row-check">
              <label class=" checkbox-label nolabel">
                <input v-show="false" class="checkbox" v-model="offer.selected" type="checkbox" id="select_all" />
                <span class="checkmark"></span>
              </label>
            </div>
            <div @click="openOffer(offer.id)" class="table-row-content">
              <div class="table-row-content-med bold">
                {{ offer.title}}
                <span class='help'>{{ offer.id }}</span>
              </div>
              <div class="table-row-content-med">
                {{ $dayjs(offer.startDate).format('YY/MM/DD') }} - {{ $dayjs(offer.endDate).format('YY/MM/DD') }}
              </div>
              <div class="access_icons table-row-content-med wrap">
                <span v-for="(cat, key) in categories" :key="key" :class="offer?.offer?.hasOwnProperty(key) ? 'active' : ''" class="material-symbols-outlined">{{ categories[key] ? categories[key].icon : '' }}</span>
              </div>
              <div class="table-row-content-sm">
                <div>
                  <!-- <ChartOfferStats :values="[0, 0, 0]" /> -->
                  <ChartOfferStats :values="[offer.stats.won, offer.stats.lost, offer.stats.pending]" />
                </div>
              </div>
            </div>
            <div class="table-row-actions">
              <!-- <div class="material-symbols-outlined" @click="saveAsCampaign(offer)">save</div> -->
              <div class="material-symbols-outlined" @click="deleteOffer(offer.id)">delete</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="campaigns.length" class="table">
        <div>
        <h2 class="mt8 mb2">Campaigns</h2>
        <div style="color:#666">Any customers matching the criteria for your campaign will see the offer</div>
      </div>
      <div class="banner_warn">
        This feature is in development. Campaigns will not be active.
      </div>
        <div class="table-header">
          <div v-show="false" class="table-header-check">
            <label class="checkbox-label nolabel">
              <input class="checkbox" type="checkbox" v-model="selectAll" id="select_all" />
              <span class="checkmark transparent"></span>
            </label>
          </div>
          <div class="table-header-content">
            <div class="table-header-content-med">Offer name</div>
            <div class="table-header-content-xs last"></div>
          </div>
          <div class="table-row-actions"></div>
        </div>
        <div class="table-rows">
          <div class="table-row" v-for="(campaign, index) in campaigns" :key="index">
            <div @click="openCampaign(campaign._id)" class="table-row-content">{{ campaign.campaignName }}</div>
            <div class="table-row-actions">
              <!-- <div class="material-symbols-outlined" @click="saveAsCampaign(offer)">save</div> -->
              <div class="material-symbols-outlined" @click="deleteCampaign(campaign._id)">delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--       <div class="pagination">
        <div class="pagination-back active" @click="pg_back">
          <span class="material-symbols-outlined">chevron_left</span>
        </div>
        <div v-for="page in pg.pageCount" :key="page" @click="gotoPage(page)" :class="page === pg.currentPage ? 'active' : ''">{{ page }}</div>

        <div class="pagination-forward active" @click="pg_forward">
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </div> -->
  </div>
  <!-- LIST CAMPAIGNS -->
</template>

<script>

import ModalWindow from '@/components/ui/ModalWindow.vue';
import FilterTabs from '../components/ui/FilterTabs.vue';
import ChartOfferStats from '@/components/ui/charts/ChartOfferStats.vue';
import api from '@/api/api'


export default {
  components: {
    ModalWindow,
    FilterTabs,
    ChartOfferStats,
    // Doughnut
  },
  watch: {
    selectAll(val) {
      for (let offer of this.offers) {
        offer.selected = val
      }
    },
    offers: {
      deep: true,
      handler() {
        let checked = false
        let unchecked = false
        for (let offer of this.offers) {
          checked = offer.selected ? true : checked
          unchecked = !offer.selected ? true : unchecked
        }
        if (checked && !unchecked) { this.selectAll = true }
        if (unchecked && !checked) { this.selectAll = false }
        // if (unchecked && checked) { // console.log('partial') }
      }
    },
    'pg.currentPage': {
      deep: true,
      async handler(page) {
        // let page = this.pg.currentPage
        // let limit = this.pg.limit
        // let skip = (page - 1) * limit
        // let filters = this.$store.getters.filters
        // let response = await this.$api_node.getOffers({ limit: limit, skip: skip, filter: filters })
        console.log(page)
        let response = await this.$switchit.getOffers()
        this.$toast.show('pagination not implemented yet')
        this.offers = response?.offers
        // this.pg.pageCount = Math.ceil(response.count / limit)
      }
    },
    filters: {
      deep: true,
      async handler() {
        this.loadOffers()
      }
    }
  },
  data() {
    return {
      modalComponent: null,
      screen: 'UserTable',
      selectAll: false,
      offers: [],
      count: 0,
      campaigns: [],
      pg: {
        currentPage: 1,
        limit: 10,
        pageCount: 0
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters.activeUser
    },
    filters() {
      return this.$store.getters.filters
    },
    categories() {
      return this.$store.getters.categories
    },

  },

  methods: {
    pg_back() {
      let p = this.pg.currentPage
      this.pg.currentPage = p > 1 ? p - 1 : p
    },
    pg_forward() {
      // // console.log(this.pg.pageCount)
      // // console.log(this.pg.currentPage)
      let p = this.pg.currentPage
      this.pg.currentPage = p < this.pg.pageCount ? p + 1 : p
    },
    openFilters() {
      // // console.log('openFilters')
      this.$store.dispatch('openMenu')
    },
    applyFilterTabs(categories) {
      // console.log('applyFilterTabs')
      // console.log(categories)
      this.$store.dispatch('setCategories', categories)
      this.loadOffers()
      /* 
      const filteredOffers = this.offers.filter((offer) => {
        // Get the categories' status from the offer's access object
        const categories = Object.keys(offer.access);

        // Check if the offer's access object has at least one category with a status that matches the filter
        return categories.some((category) => {
          return filters[category] && filters[category].status && offer.access[category].status;
        });
      });
      this.offers = filteredOffers
      // console.log('this.offers.length')
      // console.log(this.offers.length)
      this.pg.pageCount = Math.ceil(this.offers.length / this.pg.limit)
      */
    },
    async saveAsCampaign(offer) {

      let campaign = {
        offer: offer.offer,
        offer_details: offer.offer_details,
        filters: offer.filters,
        campaignName: offer.offer_details.name + ' campaign',
        // companyId: this.$store.getters.activeCompany._id,
        businessPartnerId: this.$store.getters.activeBusinessPartner.id,
        createdBy: this.$store.getters.activeUser._id,
        creator: this.$auth0.user._value.email
      }
      console.log('save these filters as campaign:', campaign)
      let response = await api.createCampaign(campaign)
      console.log('response: ', response)
      this.loadCampaigns()


    },
    async loadCampaigns() {
      this.campaigns = await api.getCampaigns()
    },
    closeModal() {
      this.modalComponent = null
    },
    openModal(component) {
      this.modalComponent = component
    },
    changePage(page) {
      this.screen = page
    },
    gotoPage(page) {
      this.pg.currentPage = page
    },
    openOffer(id) {
      console.log('openOffer', id)
      this.$router.push({ path: `/offer/${id}` })
    },
    offerStats(won, lost, pending) {

      let random = () => Math.floor(Math.random() * 100)
      return {

        labels: ['Won', 'Lost', 'Pending'],
        datasets: [
          {
            data: [won || random(), lost || random(), pending || random()]
          },
        ],
      }
    },
    createOfferStats() {
      let random = () => Math.floor(Math.random() * 100)
      let stats = {
        won: random(),
        lost: random(),
        pending: random()
      }
      return stats
    },
    openCampaign(id) {
      console.log('openCampaign', id)
      this.$router.push({ path: `/campaign/${id}` })
    },
    async deleteCampaign(id) {
      console.log('deleteCampaign ')
      console.log(id)
      let response = await this.$api_node.deleteCampaign(id)
      console.log('deleteCampaign response', response)
      this.loadOffers()
      this.loadCampaigns()
    },
    async deleteOffer(id) {
      console.log(id)
      this.$toast.show({message: 'Deleting offers is not available yet'})

      // console.log('deleteOffer')
      // console.log(id)
      // let response = await this.$api_node.deleteOffer(id)
      // console.log(response)
      // this.loadOffers()
      // this.loadCampaigns()
    },
    async loadOffers() {
      // let response = await this.$api_node.getOffers()

      let body = {
        businessPartnerId: this.$store.getters.activeBusinessPartner.id,
        skip: 0,
        take: 20
      }

      let householdId = this.$route.query.householdId
      if (householdId) {
        body.householdId = householdId
      }

      let response = await this.$switchit.getOffers(body)
      this.offers = response

      for (let offer of this.offers) {
        offer.stats = this.createOfferStats()
      }
    }
  },
  async mounted() {
    // this.loadCampaigns()
    this.loadOffers()
  }
}
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"

.pagination
  display: flex
  gap: 6px
  div
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    min-width: 30px
    min-height: 30px
    border-radius: 6px
    background: #eee
    color: #aaa
    &.active
      background: $primary
      color: white

h1
  color: #666
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #f1f1f1
  min-height: 100vh
  padding: 120px 20px 60px 20px
  top: 80px
section
  display: flex
  flex-direction: column
  gap:0px
.container
  width:100%
  max-width:900px
  display: flex
  flex-direction: column
  gap: 20px

  .pageheader__pills
    height: 20px
    display: flex
    flex-direction: row
    // justify-content: center
    align-items: center
    gap: 6px
    .pageheader__pill
      flex: 0
      justify-content: center
      align-items: center
      padding: 2px 8px
      background-color: rgba(255,255,255,.3)
      color: rgba(0,0,0,.3)
      width: auto
      height: auto
      border-radius: 20px
      &.active
        background-color: rgba(255,255,255,1)
        color: #546E7A

  .table-titlebar
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

    button
      background-color: #00C6C6
      border-radius: 25px
      color: white
      border: 0

  

pre
  color: black

.table
  display: flex
  flex-direction: column
  gap: 20px
  color: #666
  max-width: 100%
  overflow: hidden
  &-rows
    background-color: white
    border-radius:10px
    overflow: hidden
  &-row 
    display: flex
    justify-content: space-between
    align-items: center
    cursor: pointer
    padding: 0
    & > div
      min-height: 60px

  &-header
    background-color: #546E7A
    display: flex
    flex-direction: row
    justify-content: space-between
    border-radius: 10px
    color: rgba(255,255,255,0.7)

  &-header,
  &-row  
    padding: 0
    & > div
      &:hover
        background: rgba(#000, .03)
        transition: all .2s
    &-check
      display: flex
      justify-content: center
      align-items: center
      width: 40px
    &-content
      flex: 1
      display: flex
      justify-content: space-between
      align-items: center
      padding:  10px 10px 10px 50px 

      &-xs
        width: 20px
      &-sm
        width: 100px
      &-med
        width: 180px
      &-lg
        flex: 1
    &-actions
      display: flex
      // justify-content: flex-end
      justify-content: center
      align-items: center
      padding: 10px
      width: 100px
      gap:16px
      .material-symbols-outlined
        font-size: 1.5em
        opacity: .7
        color: #00C6C6

      .material-symbols-outlined.active
        opacity: 1
        color: #00BB8E
        transition: all .2s
  .last
    display: flex
    justify-content: flex-end
    color: #00BB8E
  .access_icons
    display: flex
    gap: 6px
    span
      font-size:1.5em
      opacity: .1
      color: #00C6C6
    span.active
      opacity: 1  
  // .stars 
//   font-variation-settings: {
//   'FILL' 1,
//   'wght' 400,
//   'GRAD' 0,
//   'opsz' 48
//   }
  // .checkmark
  //   background-color: #00C6C6
  
@media only screen and (max-width: 767px)
  .table-row-content,
  .table-header-content
    &-xs
      width: 20px
    &-sm
      width: 60px
    &-med
      width: 80px
    &-lg
      flex: 1
    .last
      display: flex
      justify-content: flex-end
      color: #00BB8E
    .access_icons
      display: flex
      gap: 2px
      span
        font-size:1.5em
        opacity: .1
        color: #00C6C6
      span.active
        opacity: 1  


// 
</style>

<style lang="scss">
.material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>