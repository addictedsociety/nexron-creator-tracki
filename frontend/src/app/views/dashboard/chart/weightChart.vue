<script setup lang="ts">
import { ref } from "vue"
import VueApexCharts from "vue3-apexcharts"

const series = ref([
  { name: "Gewicht", data: [85, 84.5, 84, 83.8, 83.2, 82.9, 82.4, 82.1, 81.8] },
])

const COLORS = {
  bg:   "#ffffff",  // Export-Hintergrund
  txt:  "#111827",  // gray-900
  axis: "#6b7280",  // gray-500
  grid: "#e5e7eb",  // gray-200
}

const chartOptions = ref({
  chart: {
    id: "weight-chart",
    type: "line",
    zoom: { enabled: true },
    background: COLORS.bg,     
    foreColor: COLORS.txt,
    toolbar: {
      show: true,
      export: {
        csv: { filename: "gewicht" },
        svg: { filename: "gewicht" },
        png: { filename: "gewicht" },
      },
    },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 3 },
  grid: { borderColor: COLORS.grid, strokeDashArray: 4 },
  xaxis: {
    categories: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep"],
    axisBorder: { color: COLORS.grid },
    axisTicks:  { color: COLORS.grid },
    labels: { style: { colors: COLORS.axis } },
  },
  yaxis: {
    labels: { style: { colors: COLORS.axis } },
    decimalsInFloat: 1,
  },
  legend: { labels: { colors: COLORS.txt } },
  markers: { size: 0 },
})
</script>

<template>
  <div class="w-full h-65 md:h-100 rounded-md overflow-hidden">
    <VueApexCharts
      type="line"
      height="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
