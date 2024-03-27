<template>
  <div class="donut">
   <Doughnut :options="chartOptions" :data="chartData" style="width:80px !important"/>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
ChartJS.register(ArcElement, Tooltip)

export default {
  components: { Doughnut },
  props: {
    values: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      // chartData: {
      //   labels: ['Won', 'Lost', 'Pending'],
      //   datasets: [
      //     {
      //       data: [77, 23, 125]
      //     },
      //   ]
      // },
      chartData: {
        labels: ['Won', 'Lost', 'Pending'],
        datasets: [
          {
            data: this.values || [77, 23, 125]
          },
        ]
      },
      pg: {
        currentPage: 1,
        limit: 10,
        pageCount: 0
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        color: '#00C6C6',
        backgroundColor: ['#00C6C6', '#F05858', '#fafafa'],
        borderWidth: 0,
        // borderColor: 'rgba(0, 0, 0, 0.1)',
        borderJoinStyle: 'round',
        borderAlign: 'inner',
        // offset: 60,
        cutout: '75%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            titleSpacing: 0,
            titleMarginBottom:0,
            bodySpacing: 0,
          }
        },
      }
    }
  },
  methods: {
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
  },
  mounted() {
  }
};
</script>
<!-- 
chartOptions: {
  responsive: true,
  maintainAspectRatio: false,
  color: '#00C6C6',
  backgroundColor: ['#00C6C6', '#F05858', '#fafafa'],
  borderWidth: 0,
  borderJoinStyle: 'round',
  borderAlign: 'inner',
  // offset: 60,
  cutout: '85%',
  plugins: {
    legend: {
      display: false
    }
  },
} -->

<style lang="sass" scoped>

.donut
  width: 100px !important
  height: 50px !important
  font-size: 11px
  color: #999
  padding: 5px

</style>
