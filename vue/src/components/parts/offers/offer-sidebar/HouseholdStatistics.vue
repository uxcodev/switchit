<template>
  <div>
    <div class="h-25 w-25">
      <Doughnut :options="chartOptions" :data="chartData" class="h-25 w-25" />
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  backgroundColor: ['#00FFFF', '#00C6C6', '#019CCD'],
  cutout: '70%',
};

const chartData = {
  labels: ['Mortgage', 'Home insurance', 'Car insurance'],
  datasets: [
    {
      data: [1535, 287, 112],
    },
  ],
};
</script>
