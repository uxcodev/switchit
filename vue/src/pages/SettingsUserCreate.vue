<template>
  <h2>Create new service</h2>
  <div class="switchit-form sm">
    <!-- <h3>{{ service.name }}</h3> -->
    <div class="group">
      <label for="service-name">Name</label>
      <input type="text" id="service-name" v-model="service.name" />
    </div>
    <div class="group">
      <label for="description">Description</label>
      <textarea id="description" v-model="service.description"></textarea>
    </div>
    <div class="group">
      <label for="fee">Fee</label>
      <span>
        <input class="sm" type="text" id="fee" v-model="service.feeAmount" /><span class="ml2 lighter">kr</span>
      </span>
    </div>
    <!-- <div class="group">
      <label for="type">Duration</label>
      <input class="med" type="text" id="type" v-model="service.duration" />
    </div> -->
    <!-- <select v-if="service.durationSelect && service.id === selectedServiceId" name="duration" class="duration sm" v-model="selectedDuration" @change="durationChanged">
      <option v-for="(duration, index) in service.durationArray" :key="index" :value="duration" :selected="index === 0">
        {{ duration }} mins
      </option>
    </select> -->
    <div class="group">
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="variable" value="variable" v-model="service.durationSelect" />Variable durations
        <span class="checkmark"></span>
      </label>
    </div>
    <div v-if="service.durationSelect" class="switchit-form">
      <div class="group">
        <label for="durationMin">Interval</label>
        <select name="durationMin" class="" v-model="service.durationInterval">
          <option v-for="(interval, index) in intervals" :key="index" :value="interval">
            {{ friendlyDuration(interval) }}
          </option>
        </select>
      </div>
      <div class="group">
        <label for="durationMin">Minimum duration</label>
        <select name="durationMin" class="" v-model="service.durationMin">
          <option v-for="(duration, index) in durations" :key="index" :value="duration">
            {{ friendlyDuration(duration) }}
          </option>
        </select>
      </div>
      <div class="group">
        <label for="durationMax">Maximum duration</label>
        <select name="durationMax" class="" v-model="service.durationMax">
          <option v-for="(duration, index) in durationsMax" :key="index" :value="duration">
            {{ friendlyDuration(duration) }}
          </option>
        </select>

      </div>
    </div>
    <div v-else>
      <div class="group">
        <label for="duration">Duration</label>
        <select name="duration" class="" v-model="service.duration">
          <option v-for="(duration, index) in durations" :key="index" :value="duration">
            {{ friendlyDuration(duration) }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div class="action-buttons mt10">
    <button class="secondary" @click="closeEdit">Cancel</button>
    <button @click="createService">
      Save
    </button>
  </div>

</template>

<script>
import time from '@/helpers/time'

// import api from "@/api/onsched";
export default {
  components: {
  },
  props: ['selectedService'],
  emits: ['updateService', 'closeEdit'],
  data() {
    return {
      // services: null,
      // service: {
      //   name: null,
      //   description: null,
      //   duration: null,
      //   durationSelect: false,
      //   durationInterval: null,
      //   durationMin: null,
      //   durationMax: null,
      //   feeAmount: null
      // },
      // durations: [],
      // durationsMax: [],
      // intervals: [],
      services: null,
      service: {
        name: "test",
        description: "test",
        duration: 30,
        durationSelect: false,
        durationInterval: null,
        durationMin: null,
        durationMax: null,
        feeAmount: 50
      },
      durations: [],
      durationsMax: [],
      intervals: [],
    }
  },
  beforeMount() {
    let int = 5
    let min = 5
    for (let i = int; i <= 720; i += int) {
      this.durations.push(i);
    }
    for (let i = min; i <= 720; i += int) {
      this.durationsMax.push(i);
    }
    for (let i = 5; i <= 480; i += 5) {
      this.intervals.push(i);
    }
  },
  watch: {
    'service.durationInterval': function (int) {
      this.durations = []
      for (let i = int; i <= 720; i += int) {
        this.durations.push(i);
      }
    },
    'service.durationMin': function (min) {
      let int = this.service.durationInterval
      this.durationsMax = []
      for (let i = min; i <= 480; i += int) {
        this.durationsMax.push(i);
      }
    }
    // service: {
    //   handler(newValue, oldValue) {
    //     console.log(newValue.duration) //     if (newValue == 5) {
    //       console.log(oldValue)
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
    createService() {
      this.$emit('createService', this.service)
    },
    // deleteService(id) {
    //   console.log(id)
    // },
    friendlyDuration(m) {
      return time.minutesToHours(m)
    }
  },
  async mounted() {
  }
};
</script>

<style lang="sass" scoped>
@import "/src/styles/variables.sass"

h3
  margin-block-end: 0

.services
  display: flex
  flex-direction: column
  gap: 10px
  width: 100% 
  .item
    gap:10px
    justify-content: space-between
    align-items: center
    display: flex
    background: #fafafa 
    padding: 0 0 0 10px
    border-radius: 4px
    cursor: pointer
    &:hover
      background: #f5f5f5
    .field
      padding: 10px
      min-width: 200px
    .option
      min-width: 40px
      padding: 10px 16px
      height:100%
      cursor: pointer
      border-radius: 0 6px 6px 0
      &:hover
        background: #eee


</style>