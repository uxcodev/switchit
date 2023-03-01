<template>
  <div class="filter-group">
    <!-- <div v-for="(value, key, index ) in user.access" :key="index">
      {{ value }} - {{ key }}
    </div> -->
    <div class="filter active"><span>All</span></div>
    <div v-if="user.access.mortgage" class="filter">
      <span class="icon material-symbols-outlined">house</span>
      <span class="text">Mortgage</span>
    </div>
    <div v-if="user.access.insurance" class="filter">
      <span class="icon material-symbols-outlined">verified_user</span>
      <span class="text">Insurance</span>
    </div>
    <div v-if="user.access.banking" class="filter">
      <span class="icon material-symbols-outlined">credit_card</span>
      <span class="text">Banking</span>
    </div>
    <div v-if="user.access.broadband" class="filter">
      <span class="icon material-symbols-outlined">language</span>
      <span class="text">Broadband</span>
    </div>
    <div v-if="user.access.mobile" class="filter">
      <span class="icon material-symbols-outlined">smartphone</span>
      <span class="text">Mobile</span>
    </div>
    <div v-if="user.access.utilities" class="filter">
      <span class="icon material-symbols-outlined">lightbulb</span>
      <span class="text">Utilities</span>
    </div>
    <div v-if="user.access.auto" class="filter">
      <span class="icon material-symbols-outlined">directions_car</span>
      <span class="text">Auto</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resources: Array,
  },
  data() {
    return {
      selected: null,
      user: {
        access: {
          mortgage: true,
          insurance: true,
          banking: false,
          broadband: false,
          mobile: false,
          utilities: true,
          auto: true
        }
      }
    };
  },
  methods: {
    select(resource_id) {
      this.selected = resource_id;
      // console.log(resource_id);
    },
  },
  mounted() {
    // console.log("resources: " + this.resources);

  },
};
</script>

<style lang="scss">
.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    min-width: 50px;
    padding: 6px 12px;
    font-size: 13px;
    border: 0;
    border-radius: 36px;
    color: white;
    background-color: #B0BEC5;
    transition: background-color 0.2s;
    cursor: pointer;

    .icon {
      font-size: 16px // width: 10px;
    }

    &.active {
      background-color: #546E7A;
    }

    &:hover {
      background-color: #9dacb3;
    }

    &.selected {
      background-color: #546E7A;
      color: white;
    }
  }
}
</style>
