<template>
 
  <div class="filter-group">
    <!-- <div v-for="(value, key, index ) in user.access" :key="index">
      {{ value }} - {{ key }}
    </div> -->
    <div class="filter" :class="all ? 'active' : ''" @click="changeFilters('all')"><span>All</span></div>
    <div v-for="(cat, key) in categories" :key="key" @click="changeFilters(key)" class="filter" :class="cat.status ? 'active' : ''">
      <span class="icon material-symbols-outlined"> {{ categories[key].icon }}</span>
      <span class="text">{{ key }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resources: Array,
  },
  emits: ['applyFilterTabs'],
  data() {
    return {
      all: true,
      categories: this.$store.getters.categories
    };
  },
  methods: {
    select(resource_id) {
      this.selected = resource_id;
      // // console.log(resource_id);
    },
    changeFilters(category) {
      this.all = true
      if (category === 'all') {
        for (let cat in this.categories) {
          this.categories[cat].status = false
        }
      } else {
        this.categories[category].status = !this.categories[category].status
        for (let cat in this.categories) {
          if (this.categories[cat].status) {
            this.all = false
          }
        }
      }
      // // console.log(this.categories)
      this.$emit('applyFilterTabs', this.categories)
    }
  },
  mounted() {
    for (let cat in this.categories) {
      this.categories[cat].status = false
    }
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

    &:hover {
      background-color: #9dacb3;
    }

    &.active {
      background-color: #546E7A;
    }

    &.selected {
      background-color: #546E7A;
      color: white;
    }
  }
}
</style>
