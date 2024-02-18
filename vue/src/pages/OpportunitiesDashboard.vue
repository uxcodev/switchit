<template>
  <ModalWindow v-if="modalComponent" :component="modalComponent" @closeModal="closeModal">
    <component :is="modalComponent"></component>
  </ModalWindow>
  <div class="main">
    <div class="container">
      <div class="header_options">
        <FilterTabs @applyFilterTabs="applyFilterTabs" />
        <div title="create 20 leads" v-if="isAdmin" class="icon button" @click="createFakeData"><span class="material-symbols-outlined">list_alt_add</span></div>
      </div>

      <section>
        <h1>Stats</h1>
        <div class="pageheader__boxes stats">
          <!-- <div v-for="i in 3" :key='i'><span :class='i'></span></div> -->
          <div class="card stats-rating">
            <div class="card-top">
              <div class="stats-title">
                Your rating
              </div>
              <div class="rating">
                4.3
                <div class="stars">
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                  <span class="icon-filled material-symbols-rounded">star</span>
                </div>
              </div>
            </div>
            <div class="card-bottom">
              Read reviews →
            </div>
          </div>
          <div class="card stats-deals-won">
            <div class="stats-title">
              Deals won
            </div>
            <ChartDealsWon_temp />
          </div>
          <div class="card stats-deal-size">
            <div class="stats-title">
              <div>
                Average deal size
              </div>
            </div>
            <div class="stats-deal-size-number">
              1,292€
            </div>
          </div>
        </div>
      </section>
      <div class="cards lg">
        <!-- <div v-for="i in 2" :key='i'><span :class='i'></span></div> -->
        <div class="card lg green">
          <div class="pageheader__pills">
            <div class="pageheader__pill active">Open</div>
            <div class="pageheader__pill">Won</div>
            <div class="pageheader__pill">Lost</div>
          </div>
          <div class="card lg-content">
            <div class="card lg-content-left">
              <div>Open offers:</div>
              <div class="mt4 large">141</div>
            </div>
            <div class="card lg-content-right">
              <span class="material-symbols-outlined">keyboard_arrow_right</span>
            </div>
          </div>
        </div>
        <div class="card lg blue">
          <div class="pageheader__pills">
            <div class="pageheader__pill active">Open</div>
            <div class="pageheader__pill">Won</div>
            <div class="pageheader__pill">Lost</div>
          </div>
          <div class="card lg-content">
            <div class="card lg-content-left">
              <div>Value of open offers:</div>
              <div class="mt4"><span class="large">210,543€</span> / mth</div>
            </div>
            <div class="card lg-content-right">
              <span class="material-symbols-outlined">keyboard_arrow_right</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt8 table-titlebar">
        <h1 class="table-titlebar-title">Opportunities</h1>
        <div class="table-actions">
          <div class="flex" style="color:grey" v-if="selectedLeads.length">
            {{ selectedLeads.length }} leads selected
            <a href="#" class="ml5 link" @click="clearSelection">Clear selection</a>
          </div>
          <a href="#" class="link" @click="selectAll">Select all {{ leadCount }} users</a>
          <button @click="openFilters"><span class="material-symbols-outlined">tune</span>Filter</button>
        </div>
      </div>
      <div class="table">
        <div class="table-header">
          <div class="table-header-check">
            <label class="checkbox-label">
              <input class="checkbox" type="checkbox" v-model="selectVisible" @change="toggleSelectVisible" name="select_all" />
              <span class="checkmark transparent"></span>
            </label>
          </div>
          <div class="table-header-content">
            <div class="table-header-content-sm">Match</div>
            <div class="table-header-content-med">User ID</div>
            <div class="table-header-content-lg">Services</div>
            <div class="table-header-content-sm">Value</div>
            <div class="table-header-content-sm last"></div>
          </div>
        </div>
        <div class="table-rows">
          <div v-for="(lead, index) in leads" :key="index" class="table-row">
            <div class="table-row-check">
              <label class=" checkbox-label nolabel">
                <input v-show="false" class="checkbox" v-model="lead.selected" @change="updateSelectedLeads(lead)" type="checkbox" name="select_all" />
                <span class="checkmark"></span>
              </label>

            </div>
            <div @click="openLead(lead._id)" class="table-row-content">
              <div class="table-row-content-sm">
                <div class="donut">
                  <Doughnut class='chart' id="my-chart-id" :options="chartOptions" :data="chartData" />
                  {{ lead.match }}%
                </div>
              </div>
              <div class="table-row-content-med">
                {{ lead.userId }}
              </div>
              <div class="access_icons table-row-content-lg">
                <IconsCategoryAccess :access="lead.data"/>
              </div>
              <div class="table-row-content-sm">
                {{ lead.value }} €
              </div>
              <div class="table-row-content-sm last">
                <span class="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div class="pagination-back active" @click="pg_back">
          <span class="material-symbols-outlined">chevron_left</span>
        </div>
        <div @click="gotoPage(1)" v-if="!displayedPages.includes(1)">1</div>
        <div class="disabled" v-if="!displayedPages.includes(1)">...</div>
        <div v-for="page in displayedPages" :key="page" @click="gotoPage(page)" :class="page === pg.currentPage ? 'active' : ''">{{ page }}</div>
        <div class="disabled" v-if="!displayedPages.includes(pg.pageCount)">...</div>
        <div @click="pg_last" v-if="!displayedPages.includes(pg.pageCount)">{{ pg.pageCount }}</div>
        <div class="pagination-forward active" @click="pg_forward">
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedLeads.length" class="action_panel">
    <h2 class="mr10">Send an offer to {{ selectedLeads.length }} lead{{ selectedLeads.length > 1 ? 's' : '' }}
    </h2>
    <button @click="openLeads">Send offer</button>
  </div>
</template>
<script>
import ModalWindow from "@/components/ui/ModalWindow.vue";
import FilterTabs from "../components/ui/FilterTabs.vue";
import IconsCategoryAccess from "@/components/ui/IconsCategoryAccess.vue";
import ChartDealsWon_temp from "../components/ui/charts/ChartDealsWon_temp.vue";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "vue-chartjs";


import { ref, computed, watch, onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import fake_data from "@/api/fake_data.js"; // uncomment to create fake data

ChartJS.register(ArcElement, Tooltip);

export default {
  components: {
    ModalWindow,
    FilterTabs,
    ChartDealsWon_temp,
    Doughnut,
    IconsCategoryAccess
  },

  setup() {
    const instance = getCurrentInstance();
    const api = instance.appContext.config.globalProperties.$api_node;
    const $toast = instance.appContext.config.globalProperties.$toast
    const $storeSessionValue = instance.appContext.config.globalProperties.$storeSessionValue
    const router = useRouter();
    const store = useStore();
    const modalComponent = ref(null);

    const screen = ref("UserTable");
    const leads = ref([]); // loaded leads
    const leadCount = ref(0); // total number of leads matching filters

    const user = computed(() => store.getters.activeUser);
    const filters = computed(() => store.getters.filters);
    const filtersChanged = computed(() => store.getters.filtersChanged);
    const categories = computed(() => store.getters.categories);

    // ***** Selections *****

    const selectedLeads = ref([])
    const selectVisible = ref(false);
    const selectMultiple = ref(false);

    function toggleSelectVisible() {

      // Update the selected state of all leads
      leads.value = leads.value.map((lead) => ({
        ...lead,
        selected: selectVisible.value,
      }));

      if (selectVisible.value) {
        // Add new leads to selectedLeads array
        const newLeads = leads.value.filter((lead) => !selectedLeads.value.includes(lead._id));
        selectedLeads.value.push(...newLeads.map((lead) => lead._id));
      } else {
        // Remove unselected leads from selectedLeads array
        selectedLeads.value = selectedLeads.value.filter((id) =>
          leads.value.find((lead) => lead._id === id && lead.selected)
        );
      }

      // console.log('toggleSelectVisible', selectedLeads.value)
    }

    function updateSelectedLeads(lead) {
      if (lead.selected) {
        selectedLeads.value.push(lead._id);
      } else {
        selectedLeads.value = selectedLeads.value.filter((id) => id !== lead._id);
      }
      // console.log('updateSelectedLeads', selectedLeads.value)
    }

    async function selectAll() {
      let response = await api.getLeads({
        // limit: limit,
        // skip: skip,
        filters: filters.value,
        ids: true
      });
      selectedLeads.value = await response.leads
      // console.log('selectAll', response.leads);
      // console.log('selectedLeads', selectedLeads.value)
      selectVisible.value = true
      toggleSelectVisible()
    }

    async function clearSelection() {
      selectedLeads.value = []
      selectVisible.value = false
      toggleSelectVisible()
    }

    // ***** Filters *****

    watch(filtersChanged, () => {
      loadLeads()
    });

    function openFilters() {
      store.dispatch("openMenu");
    }

    function applyFilterTabs(categories) {
      const filterObj = { ...store.getters.filters };

      for (const category in categories) {
        filterObj[category] = {
          ...filterObj[category],
          status: categories[category].status ? true : undefined
        };
      }

      store.dispatch('setFilters', filterObj);
      store.dispatch('filtersChanged');
    }




    // ***** Leads *****

    onMounted(async () => {
      await loadLeads();
    });

    function openLead(id) {
      store.dispatch("setSelectedLeads", [id]);
      // router.push({ path: `/create_offer`, query: { lead: id } });
      // save single lead to session storage
      $storeSessionValue('offer_selectedLeads', [id], 60);

      router.push({ path: `/offer`, query: { lead: id } });
    }

    function openLeads() {
      // store.dispatch("setSelectedLeads", selectedLeads);
      // save selectedLeads to session storage
      $storeSessionValue('offer_selectedLeads', selectedLeads.value, 60);
      router.push({ path: `/offer` });
    }

    async function loadLeads() {
      let response = await api.getLeads({
        limit: pg.limit,
        skip: 0,
        filters: store.getters.filters || null,
      });
      leads.value = response.leads;
      leadCount.value = response.count;

      pg.pageCount = Math.ceil(response.count / pg.limit);
    }


    // ***** Fake data *****
    const isAdmin = computed(() => store.getters.isAdmin);

    async function createFakeData() {
      // console.log(fake_data)
      await fake_data.getLeads()
      loadLeads()
      $toast.show({
        message: '20 new leads created',
        type: 'success',
        icon: 'check',
        duration: 3000,
      });
    }

    // Modal window

    function closeModal() {
      modalComponent.value = null;
    }

    function openModal(component) {
      modalComponent.value = component;
    }

    // Charts

    const chartData = {
      datasets: [
        {
          data: [77, 23]
        },
      ]
    }
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: ['#00C6C6', '#fafafa'],
      borderWidth: 0,
      borderJoinStyle: 'round',
      borderAlign: 'inner',
      cutout: '85%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
    }



    // ***** Pagination ***** 

    function pg_back() {
      let p = pg.currentPage;
      pg.currentPage = p > 1 ? p - 1 : p;
    }

    function pg_forward() {
      let p = pg.currentPage;
      pg.currentPage = p < pg.pageCount ? p + 1 : p;
    }

    function pg_last() {
      pg.currentPage = pg.pageCount;
    }

    function gotoPage(page) {
      pg.currentPage = page;
    }

    function changePage(page) {
      screen.value = page;
    }

    const pg = reactive({
      currentPage: 1,
      limit: 10,
      pageCount: 0,
    });

    const displayedPages = computed(() => {
      const width = window.innerWidth;
      const maxPages = width < 600 ? Math.floor(width / 80) : 10;

      let startPage = Math.max(1, pg.currentPage - Math.floor(maxPages / 2));
      let endPage = Math.min(pg.pageCount, startPage + maxPages - 1);

      if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      return Array(endPage - startPage + 1).fill().map((_, i) => startPage + i);
    });

    watch(() => pg.currentPage, async () => {
      let limit = pg.limit;
      let skip = (pg.currentPage - 1) * limit;
      let response = await api.getLeads({
        limit: limit,
        skip: skip,
        filters: filters.value,
      });
      leads.value = response.leads;
      leads.value = leads.value.map((lead) => ({
        ...lead,
        selected: selectedLeads.value.includes(lead._id),
      }));

      leadCount.value = response.count;
      selectVisible.value = false
    });


    return {
      ...toRefs(pg),
      modalComponent,
      screen,
      createFakeData,
      isAdmin,
      selectedLeads,
      selectVisible,
      selectMultiple,
      selectAll,
      clearSelection,
      toggleSelectVisible,
      leads,
      leadCount,
      chartData,
      pg,
      chartOptions,
      user,
      filters,
      categories,
      closeModal,
      openModal,
      changePage,
      pg_back,
      pg_forward,
      pg_last,
      openFilters,
      applyFilterTabs,
      gotoPage,
      displayedPages,
      openLead,
      openLeads,
      loadLeads,
      updateSelectedLeads,
    };
  },
};
</script>

<style lang="sass" scoped>
@import "/src/styles/styles.sass"
// @import "/src/styles/variables.sass"
@import "/src/styles/mixins.sass"
// @import "@vueform/multiselect/themes/default.css"

.link 
    color: #0088ff !important
    background: transparent !important
.pagination
  display: flex
  flex-wrap: wrap
  gap: 6px
  max-width: 100%
  overflow: hidden
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
    &.disabled
      cursor: default
      background: none

.donut
  width: 40px
  height: 40px  
  display: flex
  justify-content: center
  align-items: center
  font-size: 11px
  color: #999
  .chart
    width: 40px
    height: 40px  
    position: absolute 
h1
  color: #666
.main
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  background-color: #f1f1f1
  min-height: 100vh
  padding: 120px 20px 120px 20px
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

  .stats
    display: flex
    flex-direction: row
    gap: 20px
    .card
      flex:1
      display: flex
      flex-direction: column
      justify-content: space-between
      background-color: white
      padding: 16px
      // width: 100px
      min-height: 120px
      border-radius: 10px

      &-top
        display: flex
        flex-direction: column
        gap: 4px

      &-bottom
        color: #aaa
      

      .rating
        display: flex
        align-items: center
        font-size: 20px
        color: #666
        gap: 6px
        .stars
          display: flex
          align-items: center
          color: #00C6C6
          span
            width:20px
            heith:20px
    &-title
      font-size: 1.2em
      color:#aaa
    
    &-deals-won,
    &-deal-size
      padding: 0
      justify-content: flex-start !important
      gap: 16px
      &-number
        font-size: 1.8em 
        color: #666       
        
  .cards.lg
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 16px
  .card.lg
    display: flex
    flex-direction: column
    flex:1
    gap: 16px
    min-height: 200px   
    border-radius: 10px
    padding: 20px
    padding: 20px
    color: white
    
    &.green
      background-color: #00C6C6
    &.blue
      background-color: #019CCD
    &-content
      flex: 1
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      font-size: 1.2em
      .large
        font-size: 1.8em
  .pageheader__header
    display: flex
    background-color: #ccc
    height: 40px
    width: 100%
    border-radius: 10px

  .pageheader__table
    display: flex
    background-color: #eee
    height: 400px
    width: 100%
    border-radius: 10px

.pageheader__boxes
  display: flex
  flex-direction: row
  flex-wrap: wrap
  gap: 6px
  max-width: 100%
  overflow: hidden
  .pageheader__box
    background-color: #eee
    width: 100px
    height: 30px
    border-radius: 20px    
.checkbox-group
  flex-direction: row
  flex-wrap: wrap
  width:400px
  label
    width:160px
pre
  color: black

.table
  display: flex
  flex-direction: column
  gap: 20px
  color: #666
  max-width: 100%
  overflow: hidden

  &-actions
    display: flex
    justify-content: center
    align-items: center
    gap: 16px
    .flex
      display: flex
      gap: 6
  &-titlebar
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
    align-items: center
    max-width: 100%
    overflow: hidden

    button
      background-color: #00C6C6
      border-radius: 25px
      color: white
      border: 0
  &-rows
    background-color: white
    border-radius:10px
  &-row 
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    cursor: pointer
    &:hover
      background: #fafafa
      transition: all .2s
  &-header
    background-color: #546E7A
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 10px
    border-radius: 10px
    color: rgba(255,255,255,0.7)

  &-header,
  &-row  
    &-check
      width: 20px
      display: flex
    &-content
      flex: 1
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 10px 0 50px 
      &-xs
        width: 20px
      &-sm
        width: 100px
      &-med
        width: 150px
      &-lg
        flex: 1
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

.action_panel
  position: fixed
  bottom: 0
  width: 100vw
  display: flex
  padding: 20px 30px
  justify-content: flex-end
  background-color: white
  z-index: 9999
  @include shadow()

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
</style>

<style lang="scss">
.material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

.header_options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

}
</style>